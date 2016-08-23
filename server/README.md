# About

This directory contains a server-side app of the support-service app.

## Quick start

Go to this directory and type in your console:

```bash
bundle install
```

Make sure that `MongoDB` server is running and then type:

```bash
grape s
```

## Endpoints

To show existing endpoints type:

```bash
rake grape:routes RACK_ENV="development"
```

Result:

```bash
➜ rake grape:routes RACK_ENV="development"
      GET  |  /api/status(.json)                        |      |  Just test the API
      GET  |  /api/:version/tickets(.json)              |  v1  |  Returns all tickets
     POST  |  /api/:version/tickets(.json)              |  v1  |  Create a ticket
      GET  |  /api/:version/tickets/:id(.json)          |  v1  |  Return a ticket
      PUT  |  /api/:version/tickets/:id/reopen(.json)   |  v1  |  Reopen a ticket
      PUT  |  /api/:version/tickets/:id/close(.json)    |  v1  |  Close a ticket
      PUT  |  /api/:version/tickets/:id/read(.json)     |  v1  |  Set ticket comments as read
```

