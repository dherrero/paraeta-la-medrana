
CREATE TABLE public.order (
    id bigint NOT NULL,
    customer_name character varying(200) NOT NULL,
    customer_email character varying(200) NOT NULL,
    customer_phone character varying(30),
    customer_address text,
    status character varying(30) NOT NULL DEFAULT 'PENDING',
    total numeric(10,2) NOT NULL DEFAULT 0,
    notes text,
    deleted boolean DEFAULT false,
    createdAt timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt timestamp without time zone,
    deletedAt timestamp without time zone,
    PRIMARY KEY(id),
    CONSTRAINT order_status_check CHECK (status IN ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'))
);


ALTER TABLE public.order OWNER TO postgres;


CREATE SEQUENCE public.order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_id_seq OWNER TO postgres;


ALTER SEQUENCE public.order_id_seq OWNED BY public.order.id;

ALTER TABLE ONLY public.order ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


CREATE INDEX idx_order_status ON public.order(status) WHERE deleted = false;
CREATE INDEX idx_order_customer_email ON public.order(customer_email) WHERE deleted = false;
