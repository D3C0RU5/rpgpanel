import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
          <link href="/styles/mdbootstrap/css.css" rel="stylesheet"/>
          <link href="/styles/mdbootstrap/mdb.css" rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <script
            type="text/javascript"
            src="/scripts/mdb.min.js"
          ></script>
        <NextScript>
        </NextScript>
        </body>
      </Html>
    )
  }
}
