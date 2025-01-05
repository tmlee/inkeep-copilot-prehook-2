import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
	CopilotSmartAssistContextHookRequestSchema,
	type CopilotSmartAssistContextHookResponse,
	type MessageType,
} from "../inkeepSupportCopilotSchemas";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({
			success: false,
			error: "Unauthorized: Missing or invalid bearer token",
		});
	}

	const token = authHeader.split(" ")[1];
	if (token !== process.env.INKEEP_SUPPORT_COPILOT_API_KEY) {
		return res.status(401).json({
			success: false,
			error: "Unauthorized: Invalid token",
		});
	}

	if (req.method !== "POST") {
		return res.status(405).json({
			success: false,
			error: "Method not allowed",
		});
	}

	try {
		const parsedRequest = CopilotSmartAssistContextHookRequestSchema.safeParse(
			req.body,
		);

		if (!parsedRequest.success) {
			console.log(
				parsedRequest.error.errors
					.map((err) => `${err.path.join(".")}: ${err.message}`)
					.join(", "),
			);
			return res.status(400).json({
				success: false,
				error: `Invalid request: ${parsedRequest.error.errors
					.map((err) => `${err.path.join(".")}: ${err.message}`)
					.join(", ")}`,
			});
		}

		const {
			ticketId,
			ticketingPlatformType,
			ticketAttributes,
			userAttributes,
			organizationAttributes,
			messages,
		} = parsedRequest.data;
		const result = await fetchYourData({
			ticketId,
			ticketingPlatformType,
			ticketAttributes,
			userAttributes,
			organizationAttributes,
			messages,
		});
		return res.json({ success: true, data: result });
	} catch (error) {
		console.error("Error processing request:", error);
		return res
			.status(500)
			.json({ success: false, error: "Internal server error" });
	}
}

async function fetchYourData({
	ticketId,
	ticketingPlatformType,
	ticketAttributes,
	userAttributes,
	organizationAttributes,
	messages,
}: {
	ticketId: string;
	ticketingPlatformType: string;
	ticketAttributes: Record<string, unknown>;
	userAttributes: Record<string, unknown>;
	organizationAttributes: Record<string, unknown>;
	messages: MessageType[];
}): Promise<CopilotSmartAssistContextHookResponse> {
	// TODO: Write your business logic here

	// TODO: Add any custom instructions or guidance to influence the copilot's response. Example:
	const prompt = `
	These are the attributes from our internal system.
	If the user or organization is a subscriber to the Enterprise plan: 
		- It is important to note this in the response to the support agent.
		- The draft answer should have salutations and signatures.
	`;

	return {
		userAttributes: [],
		organizationAttributes: [],
		ticketAttributes: [],
		prompt,
		debugRaw: { ticketId: ticketId, ticketingPlatformType: ticketingPlatformType, ticketAttributes: ticketAttributes, userAttributes: userAttributes, organizationAttributes: organizationAttributes, messages: messages}
	};
}
