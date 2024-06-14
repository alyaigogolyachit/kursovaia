import parse, { HTMLReactParserOptions, Element } from "html-react-parser"

const postParse = (content: string) => {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        if (domNode.attribs.class?.includes("ql-align-center")) {
          domNode.attribs.style = "text-align: center"
        }
        if (domNode.attribs.class?.includes("ql-align-right")) {
          domNode.attribs.style = "text-align: right"
        }
        if (domNode.attribs.class?.includes("ql-align-justify")) {
          domNode.attribs.style = "text-align: justify"
        }

        if (domNode.name === "ol") {
          domNode.attribs.style = " list-style-type: decimal;"
        }
        if (domNode.name === "ul") {
          domNode.attribs.style = " list-style-type: disc; padding-left: 50px;"
        }

        if (domNode.name === "blockquote") {
          domNode.attribs.class =
            (domNode.attribs.class || "") +
            " border-l-4 border-gray-500 pl-4 italic bg-gray-100"
        }

        if (domNode.name === "h1") {
          domNode.attribs.class =
            (domNode.attribs.class || "") + " text-3xl font-bold my-4"
        }
        if (domNode.name === "h2") {
          domNode.attribs.class =
            (domNode.attribs.class || "") + " text-2xl font-semibold my-3"
        }
        if (domNode.name === "h3") {
          domNode.attribs.class =
            (domNode.attribs.class || "") + " text-xl font-medium my-2"
        }
      }
    },
  }
  return parse(content, options)
}

export default postParse
