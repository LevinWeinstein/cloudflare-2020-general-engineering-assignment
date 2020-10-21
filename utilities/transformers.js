import { links, socialLinks } from './constants'
/**
 * Transformer to change the background color to a nice light purple.
 */
class BackgroundColorTransformer{
    async element(element){
        element.setAttribute("style", "background-color: #838DBE;");
        return element;
    }
}

/**
 * Transformer to set the title to my name
 */
class TitleTransformer {
    async element(element){
        element.replace("<title>Levin Weinstein</title>", {html: true});
        console.log(element);
        return element;
    }
}

/**
 * Transformer to add social links with SVG Images
 */
class SocialTransformer{
    constructor(){
        this.links = socialLinks;
    }

    async element(element){
        element.removeAttribute("style")

        const list = this
          .links
          .map(link => `<a href=${link.address}>${link.svg}</a>`)
          .join('')

          element.append(list, {html: true})
          console.log(list)
          console.log(JSON.stringify(element));
          return element;
    }
}


/**
 * Transformer to links
 */
class LinkTransformer{
  constructor(){
      this.links = links;
  }

  async element(element){
      const list = this
          .links
          .map(link => `<a href=${link.address}>${link.name}</a>`)
          .join('')
      
      element.append(list, {html: true})
      console.log(list)
      console.log(JSON.stringify(element));
      return element;
  }
}

export {
    BackgroundColorTransformer,
    TitleTransformer,
    SocialTransformer,
    LinkTransformer
}