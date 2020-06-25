# Suspector
simple request GET API and graph viewer app made using react framework

## Dependencies
1. [node](https://nodejs.org/)
1. [create-react-app](https://github.com/facebook/create-react-app)
1. [material-ui](https://material-ui.com/)
1. [react-d3-graph](https://github.com/danielcaldas/react-d3-graph)

## Installing
1. Install node (and all dependencies, will be installed automatically on next step)

## Running
1. type `npm start` on cmd/terminal

You can try it online [here](https://suspector.herokuapp.com/)

## File Structure
```
src
│   index.js
│   theme.js
│
├───components
│   │   App.jsx
│   │   Content.jsx
│   │   Footer.jsx
│   │   FriendGraph.jsx
│   │   FriendList.jsx
│   │   Header.jsx
│   │   SearchBar.jsx
│   │
│   └───utils
│           HideOnScroll.jsx
│           Switch.jsx
│
└───stylesheets
        content.css
        footer.css
```

## Contributing
1. Edit files under components or stylesheets

## Created By
- [Jonathan Yudi Gunawan](https://github.com/JonathanGun) / 13518084

## Acknowledgement
This project is made for Programming Lab preliminary test. API used: `https://avatar.labpro.dev/friends/${id}`

## Others

### Starting Reference
[mysterybear/cra-mui repo](https://github.com/mysterybear/cra-mui)

### About LabPro API
1. Simple and easy to understand
1. Some data is duplicated
1. Some people can have friend with themselves
1. This is one way relationshop ? so sad..

Overall, thanks for providing me a platform to sharpen my knowledge. This has been my very first time creating web app using React.