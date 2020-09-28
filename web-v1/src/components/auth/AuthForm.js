import React from 'react';
import { Form, Input, Button, Typography, Space, Row, Col } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const { Title } = Typography;

function AuthForm({ type, title, buttonLabel, initialValues, onSubmit }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log('Success:', values);
    onSubmit(values);
  };
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };
  const onReset = () => {
    form.resetFields();
  };
  // const onFill = () => {
  //   form.setFieldsValue({
  //     username: 'test',
  //     password: '1234'
  //   })
  // };

  return (
    <Row justify="start" align="middle">
      <Col span={16}>
        <Title>{title}</Title>
        <Form
          form={form}
          initialValues={initialValues}
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {type === 'signUp' && (
            <Form.Item
              label="ConfirmPassword"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your ConfirmPassword!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}

          {/*<Form.Item {...tailLayout} name="remember" valuePropName="checked">*/}
          {/*  <Checkbox>Remember me</Checkbox>*/}
          {/*</Form.Item>*/}

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                {buttonLabel || 'Submit '}
              </Button>
              <Button htmlType="button" onClick={onReset}>
                지우기
              </Button>
              {/*<Button htmlType="button" onClick={onFill}>*/}
              {/*  fill*/}
              {/*</Button>*/}
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default AuthForm;
