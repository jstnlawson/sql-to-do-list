CREATE TABLE "todo" (
	"id" serial primary key,
	"task" VARCHAR (500) NOT NULL,
    "complete" boolean default false
);

INSERT INTO "todo" ("task", "complete")
VALUES ('clean gutters', false), ('dishes', true), ('fold laundry', true), ('wax lambo', false);

