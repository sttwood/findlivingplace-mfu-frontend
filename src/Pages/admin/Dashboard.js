import React from 'react'
// import { useSelector } from 'react-redux'
// MUI
import { Container } from '@mui/material'
// antd
import {
  Card,
  Col,
  Row,
  Statistic,
  Divider,
  Steps,
  List,
  Typography
} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { FaUsers } from 'react-icons/fa'
import { GoFileSubmodule } from 'react-icons/go'
import { BsFileEarmarkCodeFill } from 'react-icons/bs'
// functions
// import { userList } from '../../Services/Functions/users'
// import { listPlace } from '../../Services/Functions/place'

const dataList = [
  'Debug Authentication.',
  'Testing CRUD user for catching error.',
  'Optimized performance of website.',
  'Debug CRUD place.',
  'Testing CRUD place for catching error.',
  'Fix system loopholes.',
  'Fix bug category dissapear.',
];



const Dashboard = () => {
  // const { user } = useSelector((state) => ({ ...state }))
  // const [ data, setData ] = useState([])
  // const [ userCount, setUserCount ] = useState(7)
  // const [ place, setPlace ] = useState([]);
  // const [ placeCount, setPlaceCount ] = useState(7)

  // useEffect(() => {
  //   loadData(user.token)
  //   // eslint-disable-next-line
  // }, [])

  // Get data
  // const loadData = (authtoken) => {
  //   userList(authtoken)
  //     .then(res => {
  //       setData(res.data)
  //     }).catch(err => {
  //       console.log(err.response.data)
  //     })
  //   listPlace(authtoken)
  //     .then(res => {
  //       setPlace(res.data);
  //     }).catch(err => {
  //       console.log(err.response.data);
  //     })
  // }
  // console.log('DATA: ' + data.length)
  // console.log('DATA COUNT: ' + userCount)
  // console.log('PLACE: ' + place.length)
  // console.log('PLACE COUNT: ' + placeCount)

  return (

    <Container
      style={{
        height: '100vh',
      }}
    >
      <div className='row'>
        <div className='col'>
          <Divider orientation='left'>
            <h1>Dashboard</h1>
          </Divider>
          <div className='mt-2'>
            {/* [COUNTING] */}
            <div className="site-statistic-demo-card">
              <Row gutter={16}>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title={
                        <>
                          <FaUsers />Total User
                        </>

                      }
                      // value={userCount}
                      valueStyle={{
                        color: '#3f8600',
                      }}
                      suffix=" Person"
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title={
                        <>
                          <GoFileSubmodule />Total Post
                        </>
                      }
                      // value={placeCount}
                      valueStyle={{
                        color: '#cf1322',
                      }}
                      suffix=" Post"
                    />
                  </Card>
                </Col>
              </Row>
            </div>

            {/* [TIMELINE] */}
            <div className='mt-5'>
              <Steps
                items={[
                  {
                    title: 'Develope FLP system v1.0',
                    status: 'finish',
                  },
                  {
                    title: 'Deploy FLP system v1.0',
                    status: 'finish',
                  },
                  {
                    title: 'Develope FLP system v2.0',
                    status: 'process',
                    icon: <LoadingOutlined />,
                  },
                  {
                    title: 'Deploy FLP system v2.0',
                    status: 'wait',
                  },
                ]}
              />
            </div>

            {/* [CHANGE LOG] */}
            <div className='mt-5'>
              <List
                header={<div><BsFileEarmarkCodeFill />Chane logs</div>}
                bordered
                dataSource={dataList}
                renderItem={(item, index) => (
                  <List.Item>
                    <Typography.Text mark>log0.{index}</Typography.Text> {item}
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>

  )
}

export default Dashboard