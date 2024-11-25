import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.upsert({
        where: {email: 'johndoe@example.com'},
        update: {},
        create: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            password: 'password'
        }
    });

    const user2 = await prisma.user.upsert({
        where: {email: 'janedoe@example.com'},
        update: {},
        create: {
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'janedoe@example.com',
            password: 'password'
        }
    });

    const post1 = await prisma.article.upsert({
        where: {title: 'Prisma Adds Support for MongoDB'},
        update: {},
        create: {
            title: 'Prisma Adds Support for MongoDB',
            body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
            description: "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
            published: false,
            authorId: user1.id,
        },
    })

    const post2 = await prisma.article.upsert({
        where: {title: "What's new in Prisma? (Q1/22)"},
        update: {},
        create: {
            title: "What's new in Prisma? (Q1/22)",
            body: 'Our engineers have been working hard, issuing new releases with many improvements...',
            description: 'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
            published: true,
            authorId: user2.id,
        },
    })
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});