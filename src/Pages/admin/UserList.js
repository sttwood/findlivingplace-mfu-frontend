import React, { useRef,useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Highlighter from 'react-highlight-words'
// Timestamps
import moment from "moment"

// Antd
import { Switch, Select, Tag, Modal, Button, Input, Space, Table, Divider } from 'antd'
// MUI
import { Container, IconButton } from '@mui/material'
// Icon
import { SearchOutlined } from "@ant-design/icons";
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'

// functions
import {
  userList,
  changeStatus,
  changeRole,
  deleteUser,
  changePassword
} from '../../Services/Functions/users'

const { Column} = Table



const UserList = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const [data, setData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Passwordvalues, setPasswordvalues] = useState({
    id: "",
    password: "",
  });

  console.log("data", data)
  useEffect(() => {
    loadData(user.token)
  // eslint-disable-next-line
  }, [])

  // Get data
  const loadData = (authtoken) => {
    userList(authtoken)
      .then(res => {
      setData(res.data)
    }).catch(err => {
      console.log(err.response.data)
    })
  }
  console.log('LENGTH' + data.length)

  // Change status
  const handleChangeStatus = (statusSelected, id) => {
    const statusValue = {
      id: id,
      enabled: statusSelected
    }
    changeStatus(user.token, statusValue)
    .then(res => {
      loadData(user.token)
    }).catch(err => {
      console.log(err.response)
    })
  }
  
  // Change Role
  const handleChangeRole = (roleSelected, id) => {
    const roleValue = {
      id: id,
      role: roleSelected
    }
    changeRole(user.token, roleValue)
    .then(res => {
      console.log(res)
      loadData(user.token)
    }).catch(err => {
      console.log(err.response)
    })
  }

  // Edit password
  const handleChangePassword = (e) => {
    setPasswordvalues({ ...Passwordvalues, [ e.target.name ]: e.target.value });
  }
  const showModal = (id) => {
    setIsModalVisible(true);
    setPasswordvalues({ ...Passwordvalues, id: id });
  }
  const handleOk = () => {
    setIsModalVisible(false);
    changePassword(user.token, Passwordvalues.id, { Passwordvalues })
      .then(res => {
        console.log(res)
        loadData(user.token);
      }).catch(err => {
        console.log(err.response)
      })
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  }
  
  // handleDelete user
  const handleDelete = (id) => {
    if (window.confirm("Are You Sure Delete!!")) {
      deleteUser(user.token, id)
        .then((res) => {
          console.log(res);
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
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



  const roleSelect = ['admin', 'user']
  return (
    <>
      <Container>
        <div className='row'>
          <div className='col'>
            <Divider orientation='left'>
              <h1>User List</h1>
            </Divider>
            <Table dataSource={data} pagination={{ pageSize: 8 }} style={{ width: '100%' }}>
            <Column
                title="Email Address"
                dataIndex="email"
                key="email"
                {...getColumnSearchProps('email')}
                render={(_, record) => <>{record.email}</>}
              />
              <Column
                title="First Name"
                dataIndex="firstname"
                key="firstname"
                {...getColumnSearchProps('firstname')}
                render={(_, record) => <>{record.firstname}</>}
              />
              <Column
                title="Last Name"
                dataIndex="lastname"
                key="lastname"
                {...getColumnSearchProps('lastname')}
                render={(_, record) => <>{record.lastname}</>}

              />
              <Column
                title="Phone Number"
                dataIndex="telephone"
                key="telephone"
                {...getColumnSearchProps('telephone')}
                render={(_, record) => <>{record.telephone}</>}
              />
              <Column
                title="Role"
                dataIndex="role"
                key="role"
                render={(_, record) => 
                  <>
                    <Select 
                      onChange={(e) => handleChangeRole(e, record._id)}
                      style={{ width: '100%' }}
                      defaultValue={record.role}
                    >
                      {roleSelect.map((roleItem, index) => (
                        <Select.Option value={roleItem} key={index}>
                          {/* eslint-disable-next-line */}
                          {roleItem == 'admin'
                          ? <Tag color='red'>{roleItem}</Tag>
                          : <Tag color='green'>{roleItem}</Tag>
                          }
                        </Select.Option>
                      ))}
                    </Select>
                  </>
                }
              />
              <Column
                title="Status"
                dataIndex="enabled"
                key="enabled"
                render={(_, record) => 
                  <>
                    <Switch 
                      checked={record.enabled} 
                      onChange={(statusSelected) => handleChangeStatus(statusSelected, record._id)} 
                    />
                  </>
                }
              />
              <Column
                title="Created"
                dataIndex="createdAt"
                key="createdAt"
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
                        aria-label="edit post"
                        sx={{ color: '#E4AD35FF' }}
                        onClick={() => showModal(record._id)}
                      >
                        <BiEdit sx={{ fontSize: '36px' }} />
                      </IconButton>
                      <IconButton
                        size="medium"
                        aria-label="delete post"
                        sx={{ color: '#EB502EFF' }}
                        onClick={() => handleDelete(record._id)}
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
          <Modal
            title="Basic Modal"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>New Password :</p>
            <input
              onChange={handleChangePassword}
              type="text"
              name="password"
            />
          </Modal>
      </Container>
    </>
  )
}

export default UserList