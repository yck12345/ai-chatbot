import { tool } from "ai"; // 导入 ai 库的 tool 函数
import { JigsawStack } from "jigsawstack";
import { z } from "zod";

// 从环境变量中获取 API 密钥
const jigsawApiKey = process.env.JIGSAWSTACK_API_KEY;

// 定义工具的输入模式
const jigsawDeepResearchSchema = z.object({
  query: z.string().describe("要研究的查询或问题"),
  max_depth: z
    .number()
    .int()
    .min(1)
    .max(5)
    .default(3)
    .describe("研究的最大深度 (1-5)"),
  max_breadth: z
    .number()
    .int()
    .min(1)
    .max(5)
    .default(3)
    .describe("研究的最大广度 (1-5)"),
  max_output_tokens: z
    .number()
    .int()
    .min(1000)
    .default(32000)
    .describe("最大输出令牌数"),
});

// 创建 JigsawStack 实例
const jigsaw = JigsawStack({ apiKey: jigsawApiKey });

// 创建工具
export const jigsawDeepResearchTool = tool({
  description:
    "使用 JigsawStack 进行深度网络研究。输入应该是一个 JSON 对象，包含 'query' (string), 'max_depth' (number, 1-5, 默认 3), 'max_breadth' (number, 1-5, 默认 3), 'max_output_tokens' (number, 最小 1000, 默认 32000)。",
  inputSchema: jigsawDeepResearchSchema, // 使用 inputSchema
  execute: async ({ query, max_depth, max_breadth, max_output_tokens }) => {
    if (!jigsawApiKey) {
      return {
        error: "JIGSAWSTACK_API_KEY 未设置。请在 .env 文件中设置它。",
      };
    }

    try {
      const response = await jigsaw.web.deep_research({
        query,
        max_depth,
        max_breadth,
        max_output_tokens,
      });
      return response; // 直接返回响应对象，ai 库会处理 JSON 序列化
    } catch (error: unknown) {
      console.error("JigsawStack 深度研究失败:", error);
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "未知错误" };
    }
  },
});
