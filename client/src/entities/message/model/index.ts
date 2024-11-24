import { z } from 'zod';

export const messageSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1),
	message: z.string().min(1),
	timestamp: z.coerce.date()
});

export type MessageType = z.infer<typeof messageSchema>;
