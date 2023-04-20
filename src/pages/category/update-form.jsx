import { Form, Input } from 'antd';
import PubSub from 'pubsub-js'
import React from 'react';


//添加分类的form组件
export default function UpdateForm(props) {

    const [form] = Form.useForm()
    const { categoryName } = props
    const categoryNameValue = Form.useWatch('categoryName', form);
    React.useEffect(() => {
        //父组件点击不同，props传不同的值，input框更新为不同的值；
        form.setFieldsValue({ categoryName })
        //监视categoryName，它变化才执行里面的语句，
    }, [categoryName])//否则监视所有变动，里面内容随时执行，改不了input的值

    PubSub.publish('updateValues', categoryNameValue);
    // props.getValues((categoryNameValue));

    return (
        <Form form={form} style={{ marginTop: '30px' }}>

            <Form.Item name='categoryName'>

                <Input placeholder={categoryName} />

            </Form.Item>

        </Form>
    )
}
