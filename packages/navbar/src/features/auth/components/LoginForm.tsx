import React, { useCallback } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";

import APPCONFIG from "constants/appConfig";

const FormItem = Form.Item;

type FormProps = {
  onSubmit?: (data: any) => void;
  rememberUser: boolean;
};

const NormalLoginForm = ({ rememberUser, onSubmit }: FormProps) => {
  const { handleSubmit, control } = useForm();
  const handler = useCallback(
    (data: any) => {
      if (onSubmit) {
        onSubmit(data);
      }
    },
    [onSubmit]
  );

  return (
    <section className="form-v1-container">
      <h2>Login to Continue</h2>
      <p className="lead">
        Welcome back, sign in with your {APPCONFIG.brand} account
      </p>

      <form onSubmit={handleSubmit(handler)} className="form-v1">
        <FormItem>
          <Controller
            as={
              <Input
                size="large"
                prefix={<UserOutlined style={{ fontSize: 13 }} />}
                placeholder="Username"
              />
            }
            name="username"
            control={control}
            rules={{ required: false }}
          />
        </FormItem>
        <FormItem>
          <Controller
            as={
              <Input
                size="large"
                prefix={<LockOutlined style={{ fontSize: 13 }} />}
                type="password"
                placeholder="Password"
              />
            }
            name="password"
            control={control}
            rules={{ required: false }}
          />
        </FormItem>
        {rememberUser && (
          <FormItem className="form-v1__remember">
            <Controller
              as={<Checkbox>Remember me</Checkbox>}
              name="remember"
              control={control}
              rules={{ required: false }}
            />
          </FormItem>
        )}
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-cta btn-block"
          >
            Log in
          </Button>
        </FormItem>
      </form>
    </section>
  );
};

export default NormalLoginForm;
