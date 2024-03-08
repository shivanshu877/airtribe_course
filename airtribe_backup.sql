PGDMP           
            |            airtribe_courses    16.2    16.2 &               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16394    airtribe_courses    DATABASE     �   CREATE DATABASE airtribe_courses WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
     DROP DATABASE airtribe_courses;
                postgres    false            �            1259    16516    comments    TABLE     �   CREATE TABLE public.comments (
    id integer NOT NULL,
    lead_id integer NOT NULL,
    instructor_id integer NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.comments;
       public         heap    postgres    false            �            1259    16515    comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public          postgres    false    222                       0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public          postgres    false    221            �            1259    16486    courses    TABLE     �   CREATE TABLE public.courses (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    max_seats integer NOT NULL,
    start_date date NOT NULL,
    instructor_id integer NOT NULL
);
    DROP TABLE public.courses;
       public         heap    postgres    false            �            1259    16485    courses_id_seq    SEQUENCE     �   CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.courses_id_seq;
       public          postgres    false    218                       0    0    courses_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;
          public          postgres    false    217            �            1259    16475    instructors    TABLE     �   CREATE TABLE public.instructors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);
    DROP TABLE public.instructors;
       public         heap    postgres    false            �            1259    16474    instructors_id_seq    SEQUENCE     �   CREATE SEQUENCE public.instructors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.instructors_id_seq;
       public          postgres    false    216                       0    0    instructors_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.instructors_id_seq OWNED BY public.instructors.id;
          public          postgres    false    215            �            1259    16498    leads    TABLE     �  CREATE TABLE public.leads (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(20),
    linkedin_profile character varying(255),
    course_id integer NOT NULL,
    status character varying(20) DEFAULT 'Waitlist'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.leads;
       public         heap    postgres    false            �            1259    16497    leads_id_seq    SEQUENCE     �   CREATE SEQUENCE public.leads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.leads_id_seq;
       public          postgres    false    220                       0    0    leads_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.leads_id_seq OWNED BY public.leads.id;
          public          postgres    false    219            d           2604    16519    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            `           2604    16489 
   courses id    DEFAULT     h   ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);
 9   ALTER TABLE public.courses ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            _           2604    16478    instructors id    DEFAULT     p   ALTER TABLE ONLY public.instructors ALTER COLUMN id SET DEFAULT nextval('public.instructors_id_seq'::regclass);
 =   ALTER TABLE public.instructors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            a           2604    16501    leads id    DEFAULT     d   ALTER TABLE ONLY public.leads ALTER COLUMN id SET DEFAULT nextval('public.leads_id_seq'::regclass);
 7   ALTER TABLE public.leads ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220                      0    16516    comments 
   TABLE DATA           S   COPY public.comments (id, lead_id, instructor_id, content, created_at) FROM stdin;
    public          postgres    false    222   ?+                 0    16486    courses 
   TABLE DATA           Q   COPY public.courses (id, name, max_seats, start_date, instructor_id) FROM stdin;
    public          postgres    false    218   �+                 0    16475    instructors 
   TABLE DATA           6   COPY public.instructors (id, name, email) FROM stdin;
    public          postgres    false    216   w,       
          0    16498    leads 
   TABLE DATA           o   COPY public.leads (id, name, email, phone_number, linkedin_profile, course_id, status, created_at) FROM stdin;
    public          postgres    false    220   �,                  0    0    comments_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.comments_id_seq', 1, true);
          public          postgres    false    221                       0    0    courses_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.courses_id_seq', 9, true);
          public          postgres    false    217                       0    0    instructors_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.instructors_id_seq', 3, true);
          public          postgres    false    215                       0    0    leads_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.leads_id_seq', 9, true);
          public          postgres    false    219            q           2606    16524    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    222            k           2606    16491    courses courses_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_pkey;
       public            postgres    false    218            g           2606    16484 !   instructors instructors_email_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.instructors
    ADD CONSTRAINT instructors_email_key UNIQUE (email);
 K   ALTER TABLE ONLY public.instructors DROP CONSTRAINT instructors_email_key;
       public            postgres    false    216            i           2606    16482    instructors instructors_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.instructors
    ADD CONSTRAINT instructors_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.instructors DROP CONSTRAINT instructors_pkey;
       public            postgres    false    216            m           2606    16509    leads leads_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.leads DROP CONSTRAINT leads_email_key;
       public            postgres    false    220            o           2606    16507    leads leads_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.leads DROP CONSTRAINT leads_pkey;
       public            postgres    false    220            t           2606    16530 $   comments comments_instructor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_instructor_id_fkey FOREIGN KEY (instructor_id) REFERENCES public.instructors(id);
 N   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_instructor_id_fkey;
       public          postgres    false    222    216    4713            u           2606    16525    comments comments_lead_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id);
 H   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_lead_id_fkey;
       public          postgres    false    222    220    4719            r           2606    16492 "   courses courses_instructor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_instructor_id_fkey FOREIGN KEY (instructor_id) REFERENCES public.instructors(id);
 L   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_instructor_id_fkey;
       public          postgres    false    216    4713    218            s           2606    16510    leads leads_course_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id);
 D   ALTER TABLE ONLY public.leads DROP CONSTRAINT leads_course_id_fkey;
       public          postgres    false    220    4715    218               l   x��A�0�u{��h:#)��s����J����ռ�#C?��YWAU�(�u+9Ⴄ��e����Q����8tC��d\�5;Þ�Ɵ�~ 88⮥�ޜ��ڒY         �   x�]�A
�0EדS�*MҊ.Q��p�fИ�	$��m�J�b��y_Bٵ�g,����Ʊ��o�n����>*K�>�P���p�Tw�E|���#��S˓�
�V��wpm�c6!�����E�����`��@�����7�y������r���׸̄/� @�         X   x�3�����Sp�O��2�R�S3�J�2�R���s��8��R�s3K28��L�bU�1�ofrFbj��Oj*g.�����fV� ��&       
      x����N�0Fח���L�mV��hb���M�:TK1�����	�B�ܓ���@�r�4䡭}�zЁ��L[�wgh�6p�\�8Qi���{mg�8�r�Ć%��y��\IL#�mA�;�P��ô�f�Jb)8NZ�J+�֝���k�3�q�_�|�B�X ��j���}U��	�R�~�__I��֞<Z�L& m&Xȗu��%�;۞׾�]i5���	����:Qp�}�1��9�Jm���nR�U�D�,�q����Tև������b.T.��2�1�4��//���     