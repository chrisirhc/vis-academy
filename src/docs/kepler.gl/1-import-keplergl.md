<ul class='insert learning-objectives'>
  <li>Create a Kepler.gl instance</li>
</ul>

# What Will We Do
In this step, we will create a visualization map by importing [Kepler.gl](http://kepler.gl) react and redux components.
We are going to edit two existing files: `reducers.js`, `app.js`. We are going to apply the following changes:
- `reducers.js`: import Kepler.gl redux component to handle the map state and actions
- `app.js`: import Kepler.gl react component (aka map) and Mapbox API Token

Let's get your hands on kepler.gl implementation by following steps:

## 1. Import Kepler.gl Redux component
Open `reducers.js` in `src/` folder. We are going to perform to perform two changes in this.

First, import Kepler.gl reducer by adding in the import section of the file the following snippet:
```js
import keplerGlReducer from 'kepler.gl/reducers';
```

The second step to perform is to add the reducer to our list of reducers by applying the following changes:
```js
const reducers = combineReducers({
  app: handleActions({
    // empty
  }, initialAppState),
  routing: routerReducer
});
```
Let's now add `keplerGlReducer`
```js
const reducers = combineReducers({
  // mount keplerGl reducer
  keplerGl: keplerGlReducer,
  app: handleActions({
    // empty
  }, initialAppState),
  routing: routerReducer
});
```

The above changes will make sure Kepler.gl react component will be able to store its state and handle action handlers accordingly.

## 2. Import Kepler.gl react and set Mapbox Api token
For this part, we are going to modify `app.js` in `src/`. Currently our `app.js` only displays an H2 html tag and we are 
going to replace that tag with a Kepler.rl react component.
First since Kepler.gl relies on [Mapbox](https://www.mapbox.com/) we need to have a [Mapbox Api Token](https://www.mapbox.com/help/how-access-tokens-work/) in order to visualize the map layer.
Open `app.js` and right after the `import` section, add the following line:
```js
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line
```
By doing this you can pass the [Mapbox](https://webpack.js.org/) token when you run the app by simply doing:
```bash
MapboxAccessToken=TOKEN npm start
```
because of the way we set up Webpack you can also export the Mapbox token into your shell session and pass it to the app by doing the folloing:
```js
export MapboxAccessToken=TOKEN
```
either way it will work.

Now let's focus on bringing in the actual map and in order to do so, we are going to import the Kepler.gl react component and use it in the app.js `render function`.
For the purpose of this code we are also going to import `Autosizer` which will be really helpful to handle window resize actions.
In the import section add the following lines
```js
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';
```
The next step is to use the new imported Kepler.gl react and Autosizer components onto the `render` method by applying the following changes
```js
render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl
              mapboxApiAccessToken={MAPBOX_TOKEN}
              id="map"
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
```

the above snippet will create a map instance of kepler which use `map` as id. The __id__ is really important because it will also be used as
key in Kepler.gl redux store to keep the state of the instance updated.