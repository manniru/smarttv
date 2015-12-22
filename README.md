## App folder structure

- tv.json

      {
        "name": "My app",
        "description": "App description",
        "thumb": "image_in_assets_folder.png",
        "backgroundImage": "image_in_assets_folder.png",
        "apis": true,
        "client": "http://link.com" || true,
        "tv": "http://link.com" || true
      }

- assets

  Static assets provider from /apps/&lt;appname&gt;/assets and /apps/&lt;appname&gt;/tv/assets

- index.js

  if routing true, it will be required. Must return a function that accept
  mainWindow and storage as inputs and returns an express router

- client.html

  Returned from /apps/&lt;appname&gt;. If client=true client will load it when
  switching to an app, otherwise it will load the specified link.

- tv

  Returned from /apps/&lt;appname&gt;/tv. If tv=true client will load it
  when switching to an app, otherwise it will load the specified link.
