import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import QueueAnim from "rc-queue-anim";

import LoginForm from "../components/LoginForm";
import { loginAction } from "../actions/loginAction";

import "../styles.scss";

const FormCard = (props: any) => {
  const dispatch = useDispatch();
  const submitHandler = useCallback(
    (data) => {
      dispatch(loginAction(data));
    },
    [dispatch]
  );
  return (
    <section className="form-card-page form-card row no-gutters">
      <div
        className="form-card__img form-card__img--left col-lg-6"
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/assets/images-demo/covers/bruno-martins-442125-unsplash.jpg')`,
        }}
      ></div>
      <div className="form-card__body col-lg-6 p-5 px-lg-8 d-flex align-items-center">
        <LoginForm onSubmit={submitHandler} rememberUser={false} />
      </div>
    </section>
  );
};

const Page = (props: any) => (
  <QueueAnim type="bottom" className="ui-animate">
    <div key="1">
      <FormCard />
    </div>
  </QueueAnim>
);

export default Page;
