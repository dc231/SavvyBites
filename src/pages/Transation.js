import React, {useState,useEffect} from 'react'
import{Modal,Form,Input, Select, message, Table,DatePicker} from 'antd'
import{transactionEndpoints} from '../services/apis'
import Navbar from "../components/common/Navbar"
import{
   UnorderedListOutlined, 
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'

import Layout from '../components/Layout/Layout'
import axios from 'axios'
import Spinner from '../components/Spinner'
import moment from 'moment'
import Analytics from '../components/Analytics'
 
const{
    GET_ALL_TRANSACTION_API,
    EDIT_TRANSACTION_API,
    ADD_TRANSACTION_API,
    DELETE_TRANSACTION_API,
} = transactionEndpoints

const {RangePicker}=DatePicker

const HomePage  = () => {

  const [ShowModal,setShowModal]=useState(false);
   const[loading,setLoading]=useState(false);
   const[allTransection,setAllTransection]=useState([]);
   const[frequency,setFrequency]=useState(7);
   const[selectDate,setSelectDate]=useState([]);
   const [viewData,setViewData]=useState('table');
   const[editable,setEditable]=useState(null)

   //table data
   const columns = [
    {
      title:"Date",
      dataIndex:'date',
      //key:'date',
      render:(text)=><span>{moment(text).format("YYYY-MM-DD")}</span>
      
    },
    {
      title:"Amount",
      dataIndex:'amount',
      key:'amount',
      sorter:(record1,record2)=>{
        return record1.amount>record2.amount
      }
    },
    {
      title:"Category",
      dataIndex:'category',
      key:'category'
    },
    
    {
       title:"Actions",
       key:'actions',
       render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
             className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    }

   ]
   
   
  //  useEffect(()=>{
  //    //get all transition
  //  const getAllTransitions = async()=>{
  //   try{
  //      const user=JSON.parse(localStorage.getItem('user'))
  //      const token=JSON.parse(localStorage.getItem('token'))
  //      setLoading(true);
  //      const res=await axios.post(GET_ALL_TRANSACTION_API,
  //      {userid:user._id,
  //       frequency,
  //       selectDate,
  //       token
  //     });
  //      setLoading(false);  
  //      setAllTransection(res.data);
  //      console.log(res.data);
  //   }
  //   catch(error){
  //       setLoading(false); 
  //       console.log(error);
  //         message.error('Fetch issue with transection');
  //   }
  //  };

  //   getAllTransitions();  
  //  },[frequency , selectDate,handleDelete,handleSubmit]);

   //delete handler
   const handleDelete=async(record)=>{
     try{
      setLoading(true)
      const token=JSON.parse(localStorage.getItem('token'))
      await axios.post(DELETE_TRANSACTION_API,{transacationId:record._id,token})
      setLoading(false);
      message.success('Tranasection deleted');
     }
     catch(error){
          setLoading(false);
          console.log(error)
          message.error('unable to delete')
     }
   }
  //form handling
  const handleSubmit =async (values)=>{
      try{
        const user=JSON.parse(localStorage.getItem('user'));
        const token=JSON.parse(localStorage.getItem('token'))
        setLoading(true);
        if(editable){
          await axios.post(EDIT_TRANSACTION_API,{
            payload:{
              ...values,
              userId:user._id,
            },
            transacationId:editable._id,
            token,
          });
          setLoading(false);
          message.success('Transaction updated successfully');
        }
        else{
        await axios.post(ADD_TRANSACTION_API,{...values,userid:user._id,token});
        //await axios.post(ADD_TRANSACTION_API,{...values})
        setLoading(false);
        message.success('Transaction added successfully');
        }
        setShowModal(false);
        setEditable(null);
      }
      catch(error){
        setLoading(false);
        message.error('Failed to add transection');
      }
  };

  useEffect(()=>{
    //get all transition
  const getAllTransitions = async()=>{
   try{
      const user=JSON.parse(localStorage.getItem('user'))
      const token=JSON.parse(localStorage.getItem('token'))
      setLoading(true);
      const res=await axios.post(GET_ALL_TRANSACTION_API,
      {userid:user._id,
       frequency,
       selectDate,
       token
     });
      setLoading(false);  
      setAllTransection(res.data);
      console.log(res.data);
   }
   catch(error){
       setLoading(false); 
       console.log(error);
         message.error('Fetch issue with transection');
   }
  };

   getAllTransitions();  
  },[frequency , selectDate]);

  return (
    
  
<Layout>
  {/* <Navbar/> */}
  {loading && <Spinner />}
  <div className="flex items-center justify-between my-4">
    <div className="flex items-center space-x-4">
      <div>
        <h6 className="text-lg font-semibold">Select Frequency</h6>
        <Select value={frequency} onChange={(values) => setFrequency(values)}>
          <Select.Option value="7">Last 1 Week</Select.Option>
          <Select.Option value="30">Last 1 Month</Select.Option>
          <Select.Option value="365">Last 1 Year</Select.Option>
          <Select.Option value="custom">Custom</Select.Option>
        </Select>
        {frequency === 'custom' && (
          <RangePicker value={selectDate} onChange={(values) => setSelectDate(values)} />
        )}
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <UnorderedListOutlined
          className={`text-xl cursor-pointer ${viewData === 'table' ? 'text-blue-500' : 'text-gray-500'}`}
          onClick={() => setViewData('table')}
        />
        <AreaChartOutlined
          className={`text-xl cursor-pointer ${viewData === 'analytics' ? 'text-blue-500' : 'text-gray-500'}`}
          onClick={() => setViewData('analytics')}
        />
      </div>
      <button
        className="btn btn-primary text-richblue-900 font-semibold"
        onClick={() => setShowModal(true)}
      >
        Add New
      </button>
    </div>
  </div>
  <div className="content">
    {viewData === 'table' ? (
      <Table className="table-striped-rows" columns={columns} dataSource={allTransection} />
    ) : (
      <Analytics allTransection={allTransection} />
    )}
  </div>
  <Modal
    title={editable ? 'Edit Transection' : 'Add Transection'}
    open={ShowModal}
    onCancel={() => setShowModal(false)}
    footer={false}
  >
    <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
      <Form.Item label="Amount" name="amount">
        <Input type="text" />
      </Form.Item>
      <Form.Item label="Category" name="category">
        <Select>
          <Select.Option value="breakfast">Breakfast</Select.Option>
          <Select.Option value="lunch">Lunch</Select.Option>
          <Select.Option value="snacks">Snacks</Select.Option>
          <Select.Option value="dinner">Dinner</Select.Option>
          <Select.Option value="food">Food</Select.Option>
          <Select.Option value="fruits">Fruits</Select.Option>
          <Select.Option value="cleanliness">Cleanliness</Select.Option>
          <Select.Option value="utility">Utility</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Reference" name="reference">
        <Input type="text" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input type="text" />
      </Form.Item>
      <Form.Item label="Date" name="date">
        <Input type="date" />
      </Form.Item>
      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          SAVE
        </button>
      </div>
    </Form>
  </Modal>
</Layout>


  )
}

export default  HomePage
