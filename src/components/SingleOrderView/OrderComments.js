import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCommentsThunk, addCommentThunk, clearCommentsThunk } from '../../store/comments';
import { Form, Input, Button, Select, Comment, List } from 'antd';
const { Option } = Select;
import moment from 'moment';
const { TextArea } = Input;

const OrderComments = () => {
  const [form] = Form.useForm();
  const [author, setAuthor] = useState(false);

  const { orderid: id } = useParams();
  const orderComments = useSelector((state) => state.comments);
  const drivers = useSelector((state) => state.drivers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommentsThunk(id));
    return function cleanup() {
      dispatch(clearCommentsThunk());
    };
  }, []);

  const onFinish = (values) => {
    dispatch(addCommentThunk(id, values));
    form.resetFields();
    setAuthor(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = () => {
    setAuthor(true);
  };

  return (
    <div className="commentbox">
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={orderComments}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.author}
              content={item.content}
              datetime={moment(item.createdAt).format('M/D/YY hh:mm A')}
            />
          </li>
        )}
      />
      <Comment
        content={
          <Form
            form={form}
            name="comment-input-form"
            layout="inline"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item>
              <Form.Item
                name="content"
                style={{ width: '100%', padding: '5px 0', marginRight: '0' }}
              >
                <TextArea style={{ width: '100%' }} rows={3} placeholder="... enter new comment" />
              </Form.Item>
            </Form.Item>
            <div className="select-and-button">
              <Form.Item>
                <Form.Item name="author">
                  <Select placeholder="Select a person" onChange={onChange}>
                    {drivers.map((el) => (
                      <Option value={el.name} key={el.id}>
                        {el.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>
              <Button
                style={{
                  backgroundColor: '#6AEB6F',
                }}
                size="middle"
                htmlType="submit"
                disabled={!author}
              >
                Post Comment
              </Button>
            </div>
          </Form>
        }
      />
    </div>
  );
};

export default OrderComments;
