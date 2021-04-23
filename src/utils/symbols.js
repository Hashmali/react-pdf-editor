import icon1 from '../../src/symbols/page 1/בית-תקע-דו-קטבי.png';

function importAll(r) {
    let images = [];
    r.keys().map((item, index) => {
      let obj={icon:"",name:""} 
      obj.icon=r(item)
      obj.name=item.replace('./', '')
      images.push(obj)
  })
return images
}
const images = importAll(require.context('../../src/symbols/page 1/', false, /\.(png|jpe?g|svg)$/));





export default images;
