
import React, { useEffect, useState } from 'react'
import MainPageDash from '../mainpage/MainPageDash';
import { Button, Table } from 'antd';
import { request } from '../../utils/request';
import { formatDateClient } from '../../utils/helper';

const CategoryPageDash = () => {

    const [loading,setLoading] = useState(false);
    const [categoryList,setCategoryList] = useState([]);

    useEffect(()=>{
        getList();
    },[]);

    const getList = async () => {
        setLoading(true); // Start loading
        try {
            const res = await request("/api/category", "GET", {});
            console.log(res);
            
            // Convert the response data object into an array
            const categoriesArray = Object.values(res.data);
            
            // Set the category list with the converted array
            setCategoryList(categoriesArray);
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setLoading(false); // Set loading to false after response
        }
    };


    const columns = [
        {
            title: "№",
            key: "No",
            dataIndex: null,
            render: (text,record,index) => {
                return index + 1;
            }
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "categoryName"
        },
        {
            title: "Description",
            key: "description",
            dataIndex: "description"
        },
        {
            title: "Create At",
            key: "create_at",
            render: (text,record,index) => {
                return formatDateClient(text);
            }
        }
    ]

  return (
    <MainPageDash loading={loading}>
        <div className='flex justify-between'>
           <div>
           <div className='text-lg'>category</div>
           <div className='text-gray-400'>{categoryList.length} items</div>
           </div>
            <Button size='middle' type='primary'>Add Category</Button>
        </div>
        <Table className='mt-2' dataSource={categoryList} columns={columns} size='small' />
    </MainPageDash>
   
  )
}

export default CategoryPageDash