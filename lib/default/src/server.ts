import App from "./app";
import * as dotenv from "dotenv";
import { fileNestedStatic } from "./utils/util";

dotenv.config();

let files = fileNestedStatic('./src/routes')
  .filter(f => (f.indexOf('.route.ts') > 0));

(async () => {
    let routes = [];
    for (let file of files) {
        file = file.replace('.ts', '');
        file = file.replace('src/', '');
        const module = await import(file);
        routes.push(new module.default());
    }
    const app = new App(routes);
    app.listen();
})();





