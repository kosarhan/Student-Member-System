
SET client_encoding = 'UTF8';

CREATE FUNCTION public.student_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   IF NEW.is_deleted=true THEN
       UPDATE applications SET is_deleted=true WHERE account_id=NEW.id;
       UPDATE files SET is_deleted=true WHERE account_id=NEW.id;
       UPDATE student_infos SET is_deleted=true WHERE account_id=NEW.id;
   END IF;
 
   RETURN NEW;
END;
$$;

CREATE TABLE public.admins (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL
);

CREATE SEQUENCE public.applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.applications (
    id integer DEFAULT nextval('public.applications_id_seq'::regclass) NOT NULL,
    account_id integer NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL
);

CREATE SEQUENCE public.departments_id_seq
    START WITH 31
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.departments (
    id integer DEFAULT nextval('public.departments_id_seq'::regclass) NOT NULL,
    university_id integer NOT NULL,
    name text NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL
);

CREATE SEQUENCE public.files_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.files (
    id integer DEFAULT nextval('public.files_id_seq'::regclass) NOT NULL,
    account_id integer NOT NULL,
    registration_form text NOT NULL,
    passport_photo text NOT NULL,
    student_certificate text NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL
);

CREATE SEQUENCE public.logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.logs (
    id integer DEFAULT nextval('public.logs_id_seq'::regclass) NOT NULL,
    account_id integer NOT NULL,
    log_message text NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL
);

CREATE SEQUENCE public.student_info_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.student_infos (
    id integer DEFAULT nextval('public.student_info_id_seq'::regclass) NOT NULL,
    ssn text NOT NULL,
    account_id integer NOT NULL,
    phone_number text NOT NULL,
    university_id integer NOT NULL,
    department_id integer NOT NULL,
    class_no integer NOT NULL,
    student_number text NOT NULL,
    mother_name text NOT NULL,
    father_name text NOT NULL,
    birth_place text NOT NULL,
    birthdate date NOT NULL,
    city text NOT NULL,
    district text NOT NULL,
    cover_no integer NOT NULL,
    family_serial_no integer NOT NULL,
    serial_no integer NOT NULL,
    neighborhood text NOT NULL,
    blood_type text NOT NULL,
    address text NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL
);

CREATE SEQUENCE public.students_id_seq
    START WITH 6
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.students (
    id integer DEFAULT nextval('public.students_id_seq'::regclass) NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    verification_status boolean DEFAULT false NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL
);

CREATE SEQUENCE public.universities_id_seq
    START WITH 6
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.universities (
    id integer DEFAULT nextval('public.universities_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    city text NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL
);

CREATE VIEW public.student_lists AS
 SELECT s.id,
    s.first_name,
    s.last_name,
    u.name AS university_name,
    d.name AS department_name,
    s."createdAt",
    s."updatedAt"
   FROM (((public.students s
     JOIN public.student_infos i ON ((s.id = i.account_id)))
     JOIN public.universities u ON ((i.university_id = u.id)))
     JOIN public.departments d ON ((i.department_id = d.id)))
  WHERE ((s.is_deleted = false) AND (s.verification_status = true));

COPY public.admins (id, first_name, last_name, email, password, "createdAt", "updatedAt") FROM stdin;
1	Remzi	GAZ??	remzi.gazi@ceng.deu.edu.tr	4231	2019-12-13	2019-12-13
2	Hasan H??seyin	KO??ARHAN	hasan.kosarhan@ceng.deu.edu.tr	1234	2019-12-13	2019-12-13
3	Dokuz Eyl??l	??niversitesi	admin@bmo.com	1234	2019-12-25	2019-12-25
\.

COPY public.applications (id, account_id, "createdAt", "updatedAt", is_deleted) FROM stdin;
2	2	2019-12-25	2019-12-25	f
3	3	2019-12-25	2019-12-25	f
4	4	2019-12-25	2019-12-25	f
5	5	2019-12-25	2019-12-25	f
6	6	2019-12-25	2019-12-25	f
7	7	2019-12-25	2019-12-25	f
8	8	2019-12-25	2019-12-25	f
9	9	2019-12-25	2019-12-25	f
\.

COPY public.departments (id, university_id, name, "createdAt", "updatedAt", is_deleted) FROM stdin;
1	1	Bilgisayar M??hendisli??i	2019-12-19	2019-12-19	f
3	1	Yaz??l??m M??hendisli??i	2019-12-19	2019-12-19	f
4	2	Bilgisayar M??hendisli??i	2019-12-19	2019-12-19	f
5	2	Bilgisayar Bilimleri M??hendisli??i	2019-12-19	2019-12-19	f
6	2	Yaz??l??m M??hendisli??i	2019-12-19	2019-12-19	f
7	3	Bilgisayar M??hendisli??i	2019-12-19	2019-12-19	f
8	3	Bilgisayar Bilimleri M??hendisli??i	2019-12-19	2019-12-19	f
9	3	Yaz??l??m M??hendisli??i	2019-12-19	2019-12-19	f
10	4	Bilgisayar M??hendisli??i	2019-12-19	2019-12-19	f
11	4	Bilgisayar Bilimleri M??hendisli??i	2019-12-19	2019-12-19	f
12	4	Yaz??l??m M??hendisli??i	2019-12-19	2019-12-19	f
13	5	Bilgisayar M??hendisli??i	2019-12-19	2019-12-19	f
14	5	Bilgisayar Bilimleri M??hendisli??i	2019-12-19	2019-12-19	f
15	5	Yaz??l??m M??hendisli??i	2019-12-19	2019-12-19	f
16	6	Bilgisayar M??hendisli??i	2019-12-19	2019-12-19	f
17	6	Bilgisayar Bilimleri M??hendisli??i	2019-12-19	2019-12-19	f
18	6	Yaz??l??m M??hendisli??i	2019-12-19	2019-12-19	f
19	7	Bilgisayar M??hendisli??i	2019-12-19	2019-12-19	f
20	7	Bilgisayar Bilimleri M??hendisli??i	2019-12-19	2019-12-19	f
21	7	Yaz??l??m M??hendisli??i	2019-12-19	2019-12-19	f
22	8	Bilgisayar M??hendisli??i	2019-12-19	2019-12-19	f
23	8	Bilgisayar Bilimleri M??hendisli??i	2019-12-19	2019-12-19	f
24	8	Yaz??l??m M??hendisli??i	2019-12-19	2019-12-19	f
25	9	Bilgisayar M??hendisli??i	2019-12-19	2019-12-19	f
26	9	Bilgisayar Bilimleri M??hendisli??i	2019-12-19	2019-12-19	f
27	9	Yaz??l??m M??hendisli??i	2019-12-19	2019-12-19	f
29	15	Bilgisayar Bilimleri M??hendisli??i	2019-12-19	2019-12-24	f
28	15	Bilgisayar M??hendisli??i	2019-12-19	2019-12-24	f
2	1	Bilgisayar Bilimleri M??hendisli??i	2019-12-19	2019-12-25	f
49	1	??evre M??hendisli??i	2019-12-25	2019-12-25	f
\.

COPY public.files (id, account_id, registration_form, passport_photo, student_certificate, "createdAt", "updatedAt", is_deleted) FROM stdin;
2	2	uploads\\1577290408393.pdf	uploads\\1577290408370.jpg	uploads\\1577290408373.pdf	2019-12-25	2019-12-25	f
3	3	uploads\\1577290614065.pdf	uploads\\1577290614052.jpg	uploads\\1577290614053.pdf	2019-12-25	2019-12-25	f
4	4	uploads\\1577290875282.pdf	uploads\\1577290875255.jpg	uploads\\1577290875257.pdf	2019-12-25	2019-12-25	f
5	5	uploads\\1577291086196.pdf	uploads\\1577291086155.png	uploads\\1577291086156.pdf	2019-12-25	2019-12-25	f
6	6	uploads\\1577291400801.pdf	uploads\\1577291400770.jpg	uploads\\1577291400772.pdf	2019-12-25	2019-12-25	f
7	7	uploads\\1577291921555.pdf	uploads\\1577291921510.jpg	uploads\\1577291921512.pdf	2019-12-25	2019-12-25	f
8	8	uploads\\1577292678863.pdf	uploads\\1577292678823.jpg	uploads\\1577292678825.pdf	2019-12-25	2019-12-25	f
9	9	uploads\\1577292916062.pdf	uploads\\1577292916021.jpg	uploads\\1577292916023.pdf	2019-12-25	2019-12-25	f
\.

COPY public.logs (id, account_id, log_message, "createdAt", "updatedAt") FROM stdin;
2	2	Ba??vuru i??lemi yap??ld??. Bilgiler veritaban??na eklendi	2019-12-25	2019-12-25
3	3	Ba??vuru i??lemi yap??ld??. Bilgiler veritaban??na eklendi	2019-12-25	2019-12-25
4	3	Ba??ar??yla giri?? yap??ld??.	2019-12-25	2019-12-25
5	3	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
6	3	Ba??ar??yla ????k???? yap??ld??.	2019-12-25	2019-12-25
7	4	Ba??vuru i??lemi yap??ld??. Bilgiler veritaban??na eklendi	2019-12-25	2019-12-25
8	5	Ba??vuru i??lemi yap??ld??. Bilgiler veritaban??na eklendi	2019-12-25	2019-12-25
9	6	Ba??vuru i??lemi yap??ld??. Bilgiler veritaban??na eklendi	2019-12-25	2019-12-25
10	7	Ba??vuru i??lemi yap??ld??. Bilgiler veritaban??na eklendi	2019-12-25	2019-12-25
11	8	Ba??vuru i??lemi yap??ld??. Bilgiler veritaban??na eklendi	2019-12-25	2019-12-25
12	9	Ba??vuru i??lemi yap??ld??. Bilgiler veritaban??na eklendi	2019-12-25	2019-12-25
13	6	Ba??ar??yla giri?? yap??ld??.	2019-12-25	2019-12-25
14	6	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
15	4	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
16	4	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
17	4	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
18	4	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
19	4	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
20	4	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
21	6	Ba??ar??yla giri?? yap??ld??.	2019-12-25	2019-12-25
22	6	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
23	6	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
24	6	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
25	6	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
26	6	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
27	3	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
28	3	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
29	3	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
30	3	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
31	3	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
32	3	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
33	3	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
34	3	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
35	3	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
36	3	Ba??ar??yla ????k???? yap??ld??.	2019-12-25	2019-12-25
37	6	Ba??ar??yla giri?? yap??ld??.	2019-12-25	2019-12-25
38	6	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
39	6	Kullan??c?? hesap bilgilerini g??r??nt??ledi.	2019-12-25	2019-12-25
\.

COPY public.student_infos (id, ssn, account_id, phone_number, university_id, department_id, class_no, student_number, mother_name, father_name, birth_place, birthdate, city, district, cover_no, family_serial_no, serial_no, neighborhood, blood_type, address, "createdAt", "updatedAt", is_deleted) FROM stdin;
2	21364598234	2	05321643213	1	1	2	2017510036	Zehra	Mert	Ayd??n	1999-02-01	Ayd??n	Didim	453	32	6	Merkez	A Rh-	T??naztepe Yerle??kesi	2019-12-25	2019-12-25	f
3	64231189732	3	05326479512	3	8	3	2016510027	Zarife	Tar??k	??zmir	1998-06-15	??zmir	Konak	674	21	94	????yol	B Rh+	T??naztepe Yerle??kesi	2019-12-25	2019-12-25	f
4	89451455642	4	05326498341	7	21	1	2017510094	Emine	Fikri	Denizli	1997-04-20	Denizli	Pamukkale	126	78	34	K??n??kl??	0 Rh+	T??naztepe Yerle??kesi	2019-12-25	2019-12-25	f
5	89541144656	5	05326481956	2	6	1	2018510032	Asl??	Kerim	Mu??la	1998-06-28	Mu??la	Ula	62	12	9	Akyaka	B Rh+	T??naztepe Yerle??kesi	2019-12-25	2019-12-25	f
6	65432197315	6	05321649856	7	20	3	2015510048	Meryem	Abdullah	??zmir	1997-10-24	??zmir	Bal??ova	642	159	23	Cumhuriyet	0 Rh+	T??naztepe Yerle??kesi	2019-12-25	2019-12-25	f
7	35955984645	7	05321687943	4	11	2	2017510065	Dilek	Emre	Denizli	1998-11-14	Denizli	Tavas	123	24	19	K??z??lcab??l??k	A Rh+	T??naztepe Yerle??kesi	2019-12-25	2019-12-25	f
8	46513824676	8	05326471367	6	18	0	2019510032	Leyla	??evket	??zmir	1999-05-26	??zmir	??e??me	164	54	35	H??rriyet	A Rh-	T??naztepe Yerle??kesi	2019-12-25	2019-12-25	f
9	34685197351	9	05326417896	1	1	3	2016510051	Zarife	Mazlum	Ankara	1997-10-06	Ankara	Ke??i??ren	342	243	35	Cumhuriyet	A Rh+	T??naztepe Yerle??kesi	2019-12-25	2019-12-25	f
\.

COPY public.students (id, first_name, last_name, email, password, verification_status, "createdAt", "updatedAt", is_deleted) FROM stdin;
6	Elif Nur	Yi??it	elif.yigit@bmo.com	1234	f	2019-12-25	2019-12-25	f
7	Tar??k	Derin??z	tarik.derinoz@bmo.com	1234	f	2019-12-25	2019-12-25	f
8	Fatih	Kangal	fatih.kangal@bmo.com	1234	f	2019-12-25	2019-12-25	f
9	Sevda	??zate??	sevda.ozates@bmo.com	1234	f	2019-12-25	2019-12-25	f
2	Muhammed	Kaya	muhammed.kaya@bmo.com	1234	t	2019-12-25	2019-12-25	f
3	Melda	??lkay	melda.ilkay@bmo.com	1234	t	2019-12-25	2019-12-25	f
4	Banu	Temel	banu.temel@bmo.com	1234	t	2019-12-25	2019-12-25	f
5	Yi??it	Can	yigit.can@bmo.com	1234	t	2019-12-25	2019-12-25	f
\.

COPY public.universities (id, name, city, "createdAt", "updatedAt", is_deleted) FROM stdin;
2	Ege ??niversitesi	??zmir	2019-12-05	2019-12-05	f
3	Katip ??elebi ??niversitesi	??zmir	2019-12-05	2019-12-05	f
4	Pamukkale ??niversitesi	Denizli	2019-12-05	2019-12-05	f
5	Adnan Menderes ??niversitesi	Ayd??n	2019-12-05	2019-12-05	f
6	Orta Do??u Teknik ??niversitesi	Ankara	2019-12-05	2019-12-05	f
7	Bo??azi??i ??niversitesi	??stanbul	2019-12-05	2019-12-05	f
15	Uluda?? ??niversitesi	Bursa	2019-12-13	2019-12-24	f
9	Y??ld??z Teknik ??niversitesi	??stanbul	2019-12-05	2019-12-24	f
1	Dokuz Eyl??l ??niversitesi	??zmir	2019-12-05	2019-12-25	f
8	??stanbul Teknik ??niversitesi	??stanbul	2019-12-05	2019-12-25	f
\.

SELECT pg_catalog.setval('public.applications_id_seq', 9, true);

SELECT pg_catalog.setval('public.departments_id_seq', 49, true);

SELECT pg_catalog.setval('public.files_id_seq', 9, true);

SELECT pg_catalog.setval('public.logs_id_seq', 39, true);

SELECT pg_catalog.setval('public.student_info_id_seq', 9, true);

SELECT pg_catalog.setval('public.students_id_seq', 9, true);

SELECT pg_catalog.setval('public.universities_id_seq', 19, true);

ALTER TABLE ONLY public.admins ADD CONSTRAINT admins_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.departments ADD CONSTRAINT departments_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.files ADD CONSTRAINT files_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.student_infos ADD CONSTRAINT student_info_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.students ADD CONSTRAINT students_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.students ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE ONLY public.universities ADD CONSTRAINT universities_pkey PRIMARY KEY (id);

CREATE TRIGGER students_delete BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.student_delete();

ALTER TABLE ONLY public.applications ADD CONSTRAINT applications_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.students(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.files ADD CONSTRAINT files_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.students(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.logs ADD CONSTRAINT logs_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.students(id);

ALTER TABLE ONLY public.student_infos ADD CONSTRAINT student_info_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.student_infos ADD CONSTRAINT student_info_student_id_fkey FOREIGN KEY (account_id) REFERENCES public.students(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.student_infos ADD CONSTRAINT student_info_university_id_fkey FOREIGN KEY (university_id) REFERENCES public.universities(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.departments ADD CONSTRAINT university_id FOREIGN KEY (university_id) REFERENCES public.universities(id) NOT VALID;
