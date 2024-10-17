
import { APIResponse, ShareResponse, ShareRequest } from "@/lib/api";
import storage, { makeId } from "@/lib/storage";

import type { NextApiRequest, NextApiResponse } from "next";

export const runtime = "edge";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<APIResponse<ShareResponse>>
): Promise<void> {
    const body = req.body as ShareRequest;
    if (body.op === "get") {
        const formula = storage.get(body.id!);
        if (!formula) {
            res.status(404).json({
                status: 404
            });
            return;
        }
        res.status(200).json({
            status: 200,
            body: {
                formula
            }
        });
        return;
    } else {
        let id = makeId(4);
        while (storage.has(id)) {
            id = makeId(4);
        }
        storage.set(id, body.formula!);
        res.status(200).json({
            status: 200,
            body: {
                id
            }
        });
    }
}
