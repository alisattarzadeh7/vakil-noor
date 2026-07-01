module.exports=[37936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"registerServerReference",{enumerable:!0,get:function(){return d.registerServerReference}});let d=a.r(11857)},13095,(a,b,c)=>{"use strict";function d(a){for(let b=0;b<a.length;b++){let c=a[b];if("function"!=typeof c)throw Object.defineProperty(Error(`A "use server" file can only export async functions, found ${typeof c}.
Read more: https://nextjs.org/docs/messages/invalid-use-server-value`),"__NEXT_ERROR_CODE",{value:"E352",enumerable:!1,configurable:!0})}}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"ensureServerEntryExports",{enumerable:!0,get:function(){return d}})},58713,a=>{"use strict";var b=a.i(37936);let c=Symbol.for("__cloudflare-context__");function d(a={async:!1}){return a.async?f():function(){let a=e();if(a)return a;if(function(){let a=globalThis;return a.__NEXT_DATA__?.nextExport===!0}())throw Error("  - make sure that the call is not at the top level and that the route is not static\n  - call `getCloudflareContext({async: true})` to use the `async` mode\n  - avoid calling `getCloudflareContext` in the route\n");throw Error(h)}()}function e(){return globalThis[c]}async function f(){let a=e();if(a)return a;{var b;let a=await g();return b=a,globalThis[c]=b,a}}async function g(a){let{getPlatformProxy:b}=await import(`${"__wrangler".replaceAll("_","")}`),c=a?.environment??process.env.NEXT_DEV_WRANGLER_ENV,{env:d,cf:e,ctx:f}=await b({...a,envFiles:[],environment:c});return{env:d,cf:e,ctx:f}}let h=`

ERROR: \`getCloudflareContext\` has been called without having called \`initOpenNextCloudflareForDev\` from the Next.js config file.
You should update your Next.js config file as shown below:

   \`\`\`
   // next.config.mjs

   import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

   initOpenNextCloudflareForDev();

   const nextConfig = { ... };
   export default nextConfig;
   \`\`\`

`;async function i(a){let{env:b}=await d({async:!0}),c=String(a.get("title")??""),e=String(a.get("content")??""),f=String(a.get("slug")??""),g=String(a.get("excerpt")??"");console.log(Object.keys(b));let h=await b.DB.prepare(`
          INSERT INTO posts (title, slug, excerpt, content, created_at)
          VALUES (?, ?, ?, ?, ?)
      `).bind(c,f,g,e,new Date().toISOString()).run();return console.log({result:h}),await b.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(h.meta.last_row_id).first()}async function j(){let{env:a}=await d({async:!0});return(await a.DB.prepare(`
    SELECT *
    FROM posts
    ORDER BY created_at DESC
  `).all()).results}async function k(a){let{env:b}=await d({async:!0});await b.DB.prepare("DELETE FROM posts WHERE id = ?").bind(a).run()}async function l(a){let{env:b}=await d({async:!0});return await b.DB.prepare(`
    SELECT *
    FROM posts
    WHERE slug = ?
  `).bind(a).first()}(0,a.i(13095).ensureServerEntryExports)([i,j,k,l]),(0,b.registerServerReference)(i,"40ad797c3dcc527fe9555e973dedd7dbd09ace4575",null),(0,b.registerServerReference)(j,"009362d326df94882663221ffa6f03476164227b03",null),(0,b.registerServerReference)(k,"4094413027a084b5fa1814d3e2c74ef97d5a0a19a7",null),(0,b.registerServerReference)(l,"40dc9078d183edd8a25e50eb94045e08581d4e4ff3",null),a.s(["createPost",0,i,"deletePost",0,k,"getAllPosts",0,j,"getPostBySlug",0,l],58713)},46750,a=>{"use strict";var b=a.i(58713);a.s([],92549),a.i(92549),a.s(["009362d326df94882663221ffa6f03476164227b03",()=>b.getAllPosts,"4094413027a084b5fa1814d3e2c74ef97d5a0a19a7",()=>b.deletePost,"40ad797c3dcc527fe9555e973dedd7dbd09ace4575",()=>b.createPost,"40dc9078d183edd8a25e50eb94045e08581d4e4ff3",()=>b.getPostBySlug],46750)}];

//# sourceMappingURL=_0fdszv9._.js.map