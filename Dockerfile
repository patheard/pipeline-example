# docker build -t registry.gitlab.com/patheard/pipeline-example/node-puppeteer:latest .
# docker login registry.gitlab.com
# docker push registry.gitlab.com/patheard/pipeline-example/node-puppeteer:latest
# docker logout registry.gitlab.com
FROM node:slim

# Chromium and puppeteer deps
# for https
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates
# install libraries
RUN apt-get install -y --no-install-recommends ruby-dev libappindicator1 libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6
# tools
RUN apt-get install -y --no-install-recommends gconf-service lsb-release wget xdg-utils git
# and fonts
RUN apt-get install -y --no-install-recommends fonts-liberation && rm -rf /var/lib/apt/lists/* 

# Install the heroku deployment tool
RUN gem install dpl

WORKDIR /home/pptruser

COPY . .

# Add user so we don't need --no-sandbox.
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /var/lib/gems

# Run everything after as non-privileged user.
USER pptruser

# Install puppeteer and other demo dev and prod deps so they're available in the container.
RUN npm install

ENTRYPOINT ["npm", "start"]
