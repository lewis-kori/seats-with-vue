# seats

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## User Seat Assignment

### Overview

Create a functional web application to create create contacts and assign them a seat number. The seat number is an object containing row and col. For example: following is the seat number at `0`th row and `1`st column.

``` JSON
{
  "row": 0,
  "col": 1
}
```

### Tech stack

1.[Vue.js](https://vuejs.org/v2/guide/) for frontend using [Nuxt.js](https://nuxtjs.org/) framework.
3.[Node.js](https://nodejs.org/en/) v12.18.x
4.[bootstrap vue](https://bootstrap-vue.org/) for frontend.

### Requirements

1. As an user, I should be able to create new contact and assign a free seat number.
2. As an user, I should be able to view list of contacts along with assigned seat number.
