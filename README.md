# Frontle Modal

Modal UI in Frontle



 [![NPM Version][npm-version-image]][npm-url]

 [![NPM Install Size][npm-install-size-image]][npm-install-size-url]

 [![NPM Downloads][npm-downloads-image]][npm-downloads-url]

```javascript
<style>
  .testModalContents{
      font-size: 16px;
  }
  .testModalContents1{
      color: black;
  }
</style>

let modal = new Modal(this.handler, `
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

Installation is done using the

```shell
$ frontle install-original frontle-modal
```



## Function

#### new modal(handler, html)

Create a modal object

```javascript
let modal = new Modal(this.handler, `
    <div>this is a modal<div>
    <button id="modalCloseButton">this is a close button</button>
`);
```



#### modal.CSSClass

Set the css class of a modal

```javascript
modal.modalClass = 'classname';
modal.modalContentsClass = 'classname';
modal.modalBackgroundClass = 'classname';
```



#### modal.transitionSeconds

Setting the Modal Animation Time

```javascript
modal.transitionSeconds = '0.3';
```



#### modal.backgroundClickExit

Set whether to end the modal when you click on the modal background

```javascript
modal.backgroundClickExit = 'true';
```



#### modal.awake

Lifecycle running before the modal is rendered

```javascript
modal.awake () => { console.log('before rendering') }
```



#### modal.start

Lifecycle that runs after the modal is rendered

```javascript
modal.start () => { console.log('after rendering') }
```



#### modal.end

Lifecycle running before modal termination

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