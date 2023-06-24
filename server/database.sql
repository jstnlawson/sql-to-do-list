CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (500) NOT NULL,
    "complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todo" ("task", "complete")
VALUES ('clean gutters', false);