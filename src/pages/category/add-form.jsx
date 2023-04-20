import { Form, Input, Select } from 'antd';
import React from 'react';
import PubSub from 'pubsub-js'
const { Option } = Select;


//添加分类的form组件
export default function AddForm(props) {

    const { categorys, parentId } = props
    const [form] = Form.useForm()
    React.useEffect(() => {
        //父组件点击不同，props传不同的值，input框更新为不同的值；
        form.setFieldsValue({ parentId })  //给表单默认值
        //监视parentId，它变化才执行里面的语句，
    }, [parentId])//否则监视所有变动，里面内容随时执行，改不了input的值

    let categoryIdValue = Form.useWatch('parentId', form);//useWatch表单内值变化才会读取
    if (!categoryIdValue) categoryIdValue = parentId;//加条件判断，若表单值不变化则使用默认值
    const categoryNameValue = Form.useWatch('categoryName', form);//useWatch表单内值变化才会读取

    // console.log({ categoryNameValue, categoryIdValue });

    PubSub.publish('addValues', { categoryNameValue, categoryIdValue });

    return (
        <Form form={form} style={{ marginTop: '30px' }}>

            <h4 style={{ marginBottom: '10px' }}>所属分类：</h4>

            <Form.Item name="parentId">
                <Select  style={{ width: '100%' }}>
                    <Option key={0} value={0} selected >一级分类</Option>
                    {
                        categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                    }
                </Select>
            </Form.Item>

            <h4 style={{ marginBottom: '10px' }}>分类名称：</h4>

            <Form.Item name="categoryName">
                <Input placeholder='请输入分类名称' />
            </Form.Item>
        </Form>
    )
}
