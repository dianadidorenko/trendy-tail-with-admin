"use client";

import SectionHeaders from "@/components/common/SectionHeaders";
import PagesNav from "@/components/common/PagesNav";

const DeliverySection = () => {
  return (
    <section className="container mx-auto">
      <PagesNav />

      <div className="max-w-[900px] mx-auto">
        <SectionHeaders mainHeader={"Доставка"} />

        <div className="delivery-block border-[#ffa95c] border-[3px] rounded-3xl overflow-hidden">
          <div className="delivery-block-main">
            <img
              src="/pages/delivery/delivery-02.svg"
              className="box-pic"
              width={120}
              alt="Декоративна картинка"
            />
            <p className="border-b-[1px solid rgba(211, 211, 211, 0.31)]">
              Понеділок - п’ятниця до 12.00
            </p>
            <p style={{ borderBottom: "3px solid #ffa95c" }}>
              Ваше замовлення, оформлене у понеділок- п’ятницю відправиться в
              той же день до Вас
            </p>
            <p className="border-b-[1px solid rgba(211, 211, 211, 0.31)]">
              Понеділок - п’ятниця після 12.00
            </p>
            <p style={{ borderBottom: "3px solid #ffa95c" }}>
              Ваше замовлення, оформлене у понеділок- п’ятницю відправиться
              наступного дня до Вас
            </p>
            <p>П’ятниця після 12.00</p>
            <p style={{ borderBottom: "3px solid #ffa95c" }}>
              Ваше замовлення, оформлене у п’ятницю, субботу та неділю після 12
              відправиться до Вас в понеділок
            </p>
            <p>Час доставки по Україні</p>
            <p>
              В залежності від віддаленості населеного пункту, як правило,
              становить 1-2 дні з моменту відправлення
            </p>
          </div>
        </div>

        <h3 className="text-center my-6 text-xl">Наш партнер по доставці</h3>
        <div className="delivery-types-block border border-slate-200/20">
          <img
            src="/pages/delivery/nova-poshta.png"
            alt="Нова Пошта"
            width={120}
          />
        </div>
      </div>
    </section>
  );
};

const PaymentSection = () => {
  return (
    <section className="page__payment payment">
      <div className="payment__container">
        <SectionHeaders mainHeader={"Оплата"} />

        <div className="payment-block">
          <p
            style={{
              borderTop: "3px solid #ffa95c",
              borderBottom: "3px solid #ffa95c",
            }}
          >
            Накладний платіж
          </p>
          <p style={{ borderBottom: "3px solid #ffa95c" }}>
            100% оплата з безкоштовною доставкою
          </p>
          <p style={{ borderBottom: "3px solid #ffa95c" }}>Банківська карта</p>
          <p style={{ borderBottom: "3px solid #ffa95c" }}>
            Звертаємо вашу увагу, що при використанні купонів/сертифікатів,
            підсумкова сума може відрізнятися.
          </p>
        </div>
      </div>
    </section>
  );
};

const MainPage = () => {
  return (
    <main className="page">
      <DeliverySection />
      <PaymentSection />
    </main>
  );
};

export default MainPage;
