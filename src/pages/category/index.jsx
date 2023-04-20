import React from 'react'
import AddForm from './add-form'
import UpdateForm from './update-form';
import PubSub from 'pubsub-js'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api';
import { Button, Modal, Card, Table, Space, message } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'


export default function Category() {

  const [categorys, setCategory] = React.useState([])
  const [Subcategorys, setSubcategorys] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [parentId, setParentId] = React.useState(0)
  const [parentName, setparentName] = React.useState('')
  const [isModalOpen, setIsModalOpen] = React.useState(0);
  const [currentCategory, setcurrentCategory] = React.useState('');
  // const [updateValues, setUpdateValues] = React.useState({});
  // const [addValues, setAddValues] = React.useState({});

  //显示添加的弹框
  const showAdd = () => {
    setIsModalOpen(1)
  }
  //显示修改的弹框
  const showUpdate = (category) => {
    //把此行的category的name传过去，以便修改框默认显示当前名字
    setcurrentCategory(category)
    // console.log(category.name);
    setIsModalOpen(2)
  }

 //获取数据
  let addValues
  PubSub.subscribe('addValues', (_, data) => {
    addValues = data
  })
  //按OK后完成-添加分类-操作，并把弹窗值设为0
  const addCategory = async () => {
    //数据解构
    const { categoryNameValue, categoryIdValue } = addValues
    //发请求
    const result = await reqAddCategory(categoryNameValue, categoryIdValue)
    if (result.status === 0) {

      getCategorys()   //重新获取列表数据
    }
    //关闭弹窗
    setIsModalOpen(0);
  };

  let updateValues
  PubSub.subscribe('updateValues', (_, data) => {
    updateValues = data
  })
  /*按OK后完成-修改分类-操作，并把弹窗值设为0*/
  const updateCategory = async () => {

    //准备数据
    const categoryId = currentCategory._id
    const categoryName = updateValues
    //发请求(根据_id,name),来更改数据库该_id对应的name)
    const result = await reqUpdateCategory(categoryId, categoryName)
    //如果修改请求成功，则重新获取列表数据-至对应状态(并展示)
    if (result.status === 0) {
      getCategorys()    //重新显示列表
    }
    //关闭弹窗
    setIsModalOpen(0);
  };
  /*按取消后关闭弹窗(值设为0)*/
  const handleCancel = () => {
    setIsModalOpen(0);
  };

  //点击 回到一级分类列表
  const showCategorys = () => {

    //设置parentId为0，来刷新回到一级列表
    setParentId(0)

    /* 回一级前，把自己的二级数据清空，不然再点击到空二级时(status为1，不会更新二级数据，
    若那时不更为空，则借用这次的二级数据)*/
    setSubcategorys([])
  }

  //一二级标题设置
  const title = parentId === 0 ? '一级分类列表' : (
    <span>
      <Button type="link" onClick={showCategorys} style={{ color: '#00b96b', padding: 12, fontSize: 16 }}>
        一级分类列表</Button>
      <ArrowRightOutlined />
      <span style={{ margin: 6 }}>{parentName}</span>
    </span >
  )
  const extra = (
    <Button type="primary" onClick={showAdd}>
      <PlusOutlined />添加
    </Button>
  )


  const getCategorys = async () => {
    setLoading(true)
    const result = await reqCategorys(parentId)
    setLoading(false)
    if (result.status === 0) {
      if (parentId === 0) {
        setCategory(result.data)      //更新一级数据
      }
      else {
        setSubcategorys(result.data)  //更新二级数据
      }
    }
    else {
      message.error('获取分类列表失败')
      // setSubcategorys([])   // 这里清空二级数据也可以；不然点击其他空二级时()
    }
  }

  //根据parentId获取分类列表数据；监视parentId，变化(页面切换)后重新获取列表数据
  React.useEffect(() => {//页面挂载完渲染，一级列表
    getCategorys()
  }, [parentId])

  //点击查看分类，更改parentId以获得二级数据和一级标题
  const showSubcategorys = (category) => {
    //更新parentId，获取渲染查找条件
    setParentId(category._id)

    //更新上方一级标题显示
    setparentName(category.name)
  }

  //定义分类列表数据的展示
  const dataSource = parentId === 0 ? categorys : Subcategorys

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      width: 300,
      dataIndex: '',
      render: (category) => ( // 每一个数组子项(对象)作为参数
        <Space size="middle">

          <Button onClick={() => showUpdate(category)} style={{ color: '#00b96b' }}
            type="link">修改分类</Button>

          {(parentId === 0) ?
            <Button style={{ color: '#00b96b' }} type="link" onClick={() => showSubcategorys(category)}>查看子分类</Button> : null}

        </Space>
      )
    },
  ];

  return (

    <Card title={title} extra={extra} style={{ width: '100%', }}>
      <Table bordered 
      rowKey='_id'
      dataSource={dataSource} 
      columns={columns} 
      pagination={{ defaultPageSize: 6, showQuickJumper: true }} 
      loading={loading} />;


      {/*添加分类弹窗*/}
      <Modal destroyOnClose='true' title="添加分类" open={isModalOpen === 1} onOk={addCategory} onCancel={handleCancel}>
        <AddForm categorys={categorys} parentId={parentId} />
      </Modal>

      {/*修改分类弹窗*/}
      <Modal destroyOnClose='true' title="修改分类" open={isModalOpen === 2} onOk={updateCategory} onCancel={handleCancel}>
        <UpdateForm categoryName={currentCategory.name} />
      </Modal>


    </Card>

  )
}
