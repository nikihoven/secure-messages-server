<h1 align="center">Secure messages sender server</h1>

---

This application is based on the idea of [that](https://secureshare.support/) site. The implementation of the site is
completely original, no open source code was used in this application.

[//]: # (# [View a demo]&#40;https://silent-lad.github.io/Vue2BaremetricsCalendar/#/&#41;)

<p align="center">
<img src="https://media.giphy.com/media/zt0YcaQ7xL1SjPHbo6/giphy.gif">
</p>

# Installation (yarn)

`yarn install`

# Launch

`yarn start:dev`

# Endpoints

`/messages/create`

Post method

Body:

```js
{
    message: string 
    passphrase: string
    duration: number 
}
```

---

`/messages/validate/:url`

Get method

_**:url**_ param - _uuid_ uniq key

---

`/messages/decrypt/:url`

Post method

_**:url**_ param - _uuid_ uniq key

Body:

```js
{
    passphrase: string
}
```

---




