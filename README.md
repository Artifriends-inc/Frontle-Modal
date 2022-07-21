# Frontle Modal

Modal UI in Frontle

 [![NPM Version][npm-version-image]][npm-url]

 [![NPM Install Size][npm-install-size-image]][npm-install-size-url]

 [![NPM Downloads][npm-downloads-image]][npm-downloads-url]

![화면-기록-2022-07-12-오후-3.40.17](https://user-images.githubusercontent.com/49587288/178426815-c3584419-1c86-4b36-aa1f-dc28f6ffc3b0.gif)

```javascript
// at css file
.testModalContents{
    font-size: 16px;
}
.testModalContents1{
    color: black;
}

// at js file
import {Modal} from "../../browser_modules/frontle-modal/modal.js";

let modal = new Modal(`
    <div>this is a modal<div>
    <button id="modalCloseButton">this is a close button</button>
`);
modal.modalContentsClass = 'testModalContents testModalContents1';
modal.start = () => {
    console.log('modal start!');

    document.getElementById('modalCloseButton').onclick = () => {
        modal.close();
    }
}
modal.open();
```



## Installation

**How to install from Frontle**

```shell
$ frontle install frontle-modal
```



## Function

#### new modal(html)

Create a modal object

```javascript
let modal = new Modal(`
    <div>this is a modal<div>
    <button id="modalCloseButton">this is a close button</button>
`);
```



#### modal.CSSClass

Set the css class of a modal

```javascript
modal.modalClass = 'css_class_name';
modal.modalContentsClass = 'css_class_name';
modal.modalBackgroundClass = 'css_class_name';
```



#### modal.transitionSeconds

Set the Modal Animation Time

```javascript
modal.transitionSeconds = '0.3';
```



#### modal.backgroundClickExit

Set whether to end the modal when you click on the modal background

```javascript
modal.backgroundClickExit = 'true';
```



#### modal.awake

This lifecycle runs before modal rendering.

```javascript
modal.awake () => { console.log('before rendering') }
```



#### modal.start

This lifecycle runs after modal rendered

```javascript
modal.start () => { console.log('after rendering') }
```



#### modal.end

This lifecycle runs before modal termination

```javascript
modal.end () => { console.log('end') }
```



#### modal.open()

Open modal

```javascript
modal.open();
```



#### modal.close()

Close modal

```javascript
modal.close();
```



## People

The original author of frontle-modal is [MushStory](https://github.com/MushStory)



## License

 [MIT](LICENSE)



[npm-downloads-image]: https://badgen.net/npm/dm/frontle-modal
[npm-downloads-url]: https://npmcharts.com/compare/frontle-modal?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/frontle-modal
[npm-install-size-url]: https://packagephobia.com/result?p=frontle-modal
[npm-url]: https://npmjs.org/package/frontle-modal
[npm-version-image]: https://badgen.net/npm/v/frontle-modal