import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { getPostBySlug, searchPosts } from "@/lib/db";
import {
  absoluteUrl,
  CONTACT_PHONE_E164,
  DEFAULT_DESCRIPTION,
  PERSON_NAME,
  PRACTICE_AREA,
  SITE_URL,
} from "@/lib/seo";
import type { Post } from "@/lib/types";
import { isIndexablePost } from "@/lib/seo";

function formatArticle(post: Post, includeContent = false) {
  return [
    `# ${post.title}`,
    `URL: ${absoluteUrl(`/posts/${post.slug}`)}`,
    `Published: ${post.created_at}`,
    "",
    post.excerpt,
    ...(includeContent ? ["", post.content] : []),
  ].join("\n");
}

function toolError(error: unknown) {
  console.error("MCP tool error:", error);
  return {
    content: [
      {
        type: "text" as const,
        text: "The website content could not be retrieved right now. Please try again later.",
      },
    ],
    isError: true,
  };
}

export function createVakilNoorMcpServer() {
  const server = new McpServer(
    { name: "vakilnoor-website", version: "1.0.0" },
    {
      instructions:
        "Use these read-only tools when a user asks about the Vakil Noor website, its legal articles, services, or contact details. Search before answering a substantive question, cite the returned article URL, and state that article content is general information rather than personalized legal advice.",
    },
  );

  server.registerTool(
    "search_website_articles",
    {
      title: "Search Vakil Noor articles",
      description:
        "Search current public legal articles on Vakil Noor. Use this first when the user's question may be answered by the website's articles.",
      inputSchema: {
        query: z
          .string()
          .trim()
          .min(2)
          .max(200)
          .describe("Words or phrase to search for."),
        limit: z
          .number()
          .int()
          .min(1)
          .max(10)
          .optional()
          .describe("Maximum number of results. Defaults to 5."),
      },
    },
    async ({ query, limit = 5 }) => {
      try {
        const posts = (await searchPosts(query, limit)).filter(isIndexablePost);

        if (posts.length === 0) {
          return {
            content: [
              {
                type: "text" as const,
                text: `No matching public articles were found for “${query}”.`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text" as const,
              text: posts.map((post) => formatArticle(post)).join("\n\n---\n\n"),
            },
          ],
        };
      } catch (error) {
        return toolError(error);
      }
    },
  );

  server.registerTool(
    "get_website_article",
    {
      title: "Get a Vakil Noor article",
      description:
        "Retrieve the full text of a public Vakil Noor article after finding its slug with search_website_articles.",
      inputSchema: {
        slug: z
          .string()
          .trim()
          .min(1)
          .max(255)
          .describe("The article slug returned by the search tool."),
      },
    },
    async ({ slug }) => {
      try {
        const post = await getPostBySlug(slug);

        if (!post || !isIndexablePost(post)) {
          return {
            content: [
              {
                type: "text" as const,
                text: "The requested public article was not found.",
              },
            ],
            isError: true,
          };
        }

        return {
          content: [{ type: "text" as const, text: formatArticle(post, true) }],
        };
      } catch (error) {
        return toolError(error);
      }
    },
  );

  server.registerTool(
    "get_website_profile",
    {
      title: "Get Vakil Noor profile",
      description:
        "Get the public profile, service area, contact details, and canonical website URLs for Vakil Noor.",
    },
    async () => ({
      content: [
        {
          type: "text" as const,
          text: [
            `# ${PERSON_NAME}`,
            DEFAULT_DESCRIPTION,
            `Service area: ${PRACTICE_AREA}`,
            `Website: ${SITE_URL}`,
            `Articles: ${absoluteUrl("/posts")}`,
            `Phone: ${CONTACT_PHONE_E164}`,
          ].join("\n"),
        },
      ],
    }),
  );

  return server;
}
