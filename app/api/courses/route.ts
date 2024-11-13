import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        //scope of an error
        const { userId } = await auth();
        const {title} = await req.json();

        if(!userId) {
            return new NextResponse("Unauthorized", {status:401});
        }

        //Have to create db file after finding platform
        const course = await db.course.create({
            data: {
                userId,
                title,
            }
        });

        return NextResponse.json(course);

    } catch(error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}