
DROP DATABASE IF EXISTS postgres

CREATE TABLE public.products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999 CACHE 1 ),
    name text COLLATE pg_catalog."default",
    CONSTRAINT products_pkey PRIMARY KEY (id)
)


-- ALTER TABLE public.products
--     OWNER to postgres;

CREATE TABLE public.questions
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999 CACHE 1 ),
    question_body text COLLATE pg_catalog."default",
    question_date date,
    asker_name text COLLATE pg_catalog."default",
    question_helpfulness integer,
    reported integer,
    email text COLLATE pg_catalog."default",
    product_id integer,
    CONSTRAINT questions_pkey PRIMARY KEY (id),
    CONSTRAINT product_id FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- ALTER TABLE public.questions
--     OWNER to postgres;

CREATE TABLE public.answers
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999 CACHE 1 ),
    body text COLLATE pg_catalog."default",
    date date,
    answerer_name text COLLATE pg_catalog."default",
    helpfulness integer,
    question_id integer,
    CONSTRAINT id PRIMARY KEY (id),
    CONSTRAINT question_id FOREIGN KEY (question_id)
        REFERENCES public.questions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- ALTER TABLE public.answers
--     OWNER to postgres;

CREATE TABLE public.photos
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999 CACHE 1 ),
    url text COLLATE pg_catalog."default",
    answer_id integer,
    CONSTRAINT photos_pkey PRIMARY KEY (id),
    CONSTRAINT answer_id FOREIGN KEY (answer_id)
        REFERENCES public.answers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- ALTER TABLE public.photos
--     OWNER to postgres;
 