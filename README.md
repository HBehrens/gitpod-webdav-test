[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/HBehrens/gitpod-webdav-test)

# gitpod-webdav-test

Example of how to use local tooling with [Gitpod](https://gitpod.io) by mounting workspaces via WebDAV.

Watch the [dedicated Youtube video](https://youtu.be/TeDFE48Zpdk) to see this in action

[![Demo Video on Youtube](https://img.youtube.com/vi/TeDFE48Zpdk/0.jpg)](https://www.youtube.com/watch?v=TeDFE48Zpdk)

or try it yourself:

 * public-facing address of WebDAV server is `gp url 5000`
 * username: `admin`, password `admin` (configuration at `bin/webdav/unsafe-example.yaml`)
  
On macOS, mount WebDAV server via CMD+K in Finder.

Look at that `.gitpod.yml` to see how the WebDAV server was setup.

# Caveats

This is just an experiment. A more robust solution could be implemented with a custom virtual file system using FUSE.

With the demo at hand, I encountered these problems

* Files producd inside a workspace may get cached on the client, effectively making changes unavailable
* Some local tools perform write operations (not investigated yet) that are incompatible with the WebDavServer
* macOS struggles with unmounting after the mounted Gitpod workspace was stopped
* macOS seems to fail on write operations unless you require WebDAV authentication
* macOS persists [a lot of meta data](https://apple.stackexchange.com/a/51147). See `.theia/settings.json` how to hide this fom the project explorer