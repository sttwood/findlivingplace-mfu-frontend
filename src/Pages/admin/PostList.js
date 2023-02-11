/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Highlighter from 'react-highlight-words'
// Time format
import moment from "moment"

// MUI
import { Container, IconButton } from '@mui/material'

// antd
import { Button, Input, Space, Table, Divider } from 'antd'
// Icon
import { SearchOutlined } from "@ant-design/icons";
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FaRegEye } from 'react-icons/fa'
// Funtion
import { listPlace, removePlace } from '../../Services/Functions/place'


const { Column} = Table


const PostList = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const [ place, setPlace ] = useState([]);



  useEffect(() => {
    loadData(user.token)
    // eslint-disable-next-line
  }, [])

  // Get data
  const loadData = (authtoken) => {
    listPlace(authtoken)
      .then(res => {
        setPlace(res.data);
      }).catch(err => {
        console.log(err.response.data);
      })
  }
  // Remove
  const handleRemove = (id) => {
    if (window.confirm('Are you sure to delete?')) {
      removePlace(user.token, id)
        .then(res => {
          loadData(user.token)
          alert('Delete ' + res.data.title + ' success!')
          console.log(res)
        }).catch(err => {
          alert('Remove error!!!')
          console.log(err.response)
        })
    }
  }
  // Search
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  return (
    <>
      <Container>
        <div className='row'>
          <div className='col'>
            <Divider orientation='left'>
              <h1>Post List</h1>
            </Divider>
            <Table dataSource={place} pagination={{ pageSize: 5 }} style={{ width: '100%' }}>
              <Column
                title="Image"
                dataIndex="images"
                key="images"
                width="15%"
                render={(_, record) => (
                  <td>
                    <img
                      className="m-2"
                      style={{
                        height: "100px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                      alt="example"
                      src={record.images && record.images.length ? record.images[ 0 ].url : ""}
                    />
                  </td>
                )}
              />
              <Column
                title="Name"
                dataIndex="title"
                key="title"
                width="15%"
                {...getColumnSearchProps('title')}
                render={(_, record) => <>{record.title}</>}

              />
              <Column
                title="Category"
                dataIndex="category"
                key="category"
                width="10%"
                sorter={(a, b) => a.category.name.length - b.category.name.length}
                sortDirections={[ 'descend', 'ascend' ]}
                render={(_, record) => <>{record.category.name}</>}
              />
              <Column
                title="Price"
                dataIndex="price"
                key="price"
                width="10%"
                sorter={(a, b) => a.price - b.price}
                sortDirections={[ 'descend', 'ascend' ]}
                render={(_, record) => <>{record.price}</>}
              />
              <Column
                title="Author"
                dataIndex="email"
                key="email"
                width="20%"
                {...getColumnSearchProps('email')}
                render={(_, record) => <>{record.email}</>}
              />
              <Column
                title="Created"
                dataIndex="createdAt"
                key="createdAt"
                width="10%"
                sorter={(a, b) => moment(a.createdAt, "DD-MM-YYYY").valueOf() - moment(b.createdAt, "DD-MM-YYYY").valueOf()}
                sortDirections={[ 'descend', 'ascend' ]}
                render={(_, record) => (
                  <>{moment(record.createdAt).format("DD-MM-YYYY")}</>
                )}
              />
              <Column
                title="Updated"
                dataIndex="updatedAt"
                key="updatedAt"
                width="10%"
                sorter={(a, b) => moment(a.updatedAt, "DD-MM-YYYY").valueOf() - moment(b.updatedAt, "DD-MM-YYYY").valueOf()}
                sortDirections={[ 'descend', 'ascend' ]}
                render={(_, record) => (
                  <>{moment(record.updatedAt).format("DD-MM-YYYY")}</>
                )}
              />
              <Column
                title="Actions"
                key="action"
                width="10%"
                render={(_, record) => (
                  <>
                    <Space size="middle">
                      <IconButton
                        size="medium"
                        aria-label="view post"
                        component={Link}
                        to={'/place/' + record._id}
                        sx={{ color: '#5876FBFF' }}
                      >
                        <FaRegEye sx={{ fontSize: '36px' }} />
                      </IconButton>
                      <IconButton
                        size="medium"
                        aria-label="edit post"
                        component={Link}
                        to={'/user/update-place/' + record._id}
                        sx={{ color: '#E4AD35FF' }}
                      >
                        <BiEdit sx={{ fontSize: '36px' }} />
                      </IconButton>
                      <IconButton
                        size="medium"
                        aria-label="delete post"
                        sx={{ color: '#EB502EFF' }}
                        onClick={() => handleRemove(record._id)}
                      >
                        <RiDeleteBinLine sx={{ fontSize: '36px' }} />
                      </IconButton>
                    </Space>
                  </>
                )}
              />
            </Table>
          </div>
        </div>
        
        

      </Container>

    </>
  )
}

export default PostList