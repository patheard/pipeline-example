# docker build -t node-puppeteer .
# docker tag node-puppeteer registry.gitlab.com/patheard/pipeline-example/node-puppeteer:latest
# docker login registry.gitlab.com
# docker push registry.gitlab.com/patheard/pipeline-example/node-puppeteer:latest
# docker logout registry.gitlab.com
FROM node:slim

# See https://crbug.com/795759
RUN apt-get update && apt-get install -yq libgconf-2-4

# Install latest chrome dev package
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer installs, work.
RUN apt-get update && apt-get install -y wget ruby-dev git --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb

# It's a good idea to use dumb-init to help prevent zombie chrome processes.
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# Uncomment to skip the chromium download when installing puppeteer. If you do,
# you'll need to launch puppeteer with:
#     browser.launch({executablePath: 'google-chrome-unstable'})
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install puppeteer and other demo dev and prod deps so they're available in the container.
COPY package*.json ./
RUN npm install

# Install the heroku deployment tool
RUN gem install dpl

# Add user so we don't need --no-sandbox.
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /node_modules \
    && chown -R pptruser:pptruser /var/lib/gems

# Run everything after as non-privileged user.
USER pptruser

ENTRYPOINT ["dumb-init", "--"]
CMD ["google-chrome-unstable"]
