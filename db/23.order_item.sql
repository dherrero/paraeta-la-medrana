
CREATE TABLE public.order_item (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    product_id bigint NOT NULL,
    product_name character varying(200) NOT NULL,
    product_price numeric(10,2) NOT NULL,
    quantity integer NOT NULL DEFAULT 1,
    subtotal numeric(10,2) NOT NULL,
    deleted boolean DEFAULT false,
    createdAt timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt timestamp without time zone,
    deletedAt timestamp without time zone,
    PRIMARY KEY(id),
    CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES public.order(id) ON DELETE RESTRICT,
    CONSTRAINT fk_order_item_product FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE RESTRICT
);


ALTER TABLE public.order_item OWNER TO postgres;


CREATE SEQUENCE public.order_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_item_id_seq OWNER TO postgres;


ALTER SEQUENCE public.order_item_id_seq OWNED BY public.order_item.id;

ALTER TABLE ONLY public.order_item ALTER COLUMN id SET DEFAULT nextval('public.order_item_id_seq'::regclass);


CREATE INDEX idx_order_item_order_id ON public.order_item(order_id);
CREATE INDEX idx_order_item_product_id ON public.order_item(product_id);
