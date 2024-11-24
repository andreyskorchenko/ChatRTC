import { z } from 'zod';

export const roomsSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1),
	online: z.number(),
	timestamp: z.coerce.date()
});

export type RoomType = z.infer<typeof roomsSchema>;
