import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function Feed() {
  const feed = [
    {
      name: 'React',
      jobtitle: 'Senior Accountant',
      company: 'Trudoo',
      avatar: '/static/images/avatars/1.jpg'
    },
    {
      name: 'JavaScript',
      jobtitle: 'Associate Professor',
      company: 'Buzzdog',
      avatar: '/static/images/avatars/2.jpg'
    },
    {
      name: 'Web 3.0',
      jobtitle: 'Pharmacist',
      company: 'Yozio',
      avatar: '/static/images/avatars/3.jpg'
    },
    {
      name: 'Node.Js',
      jobtitle: 'VP Operations',
      company: 'Cogibox',
      avatar: '/static/images/avatars/4.jpg'
    },
    {
      name: 'React Native',
      jobtitle: 'VP Operations',
      company: 'Cogibox',
      avatar: '/static/images/avatars/4.jpg'
    },
  ];

  return (
    <Card>
      <CardHeader title="Top 5 Skills" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          {feed.map((_feed) => (
            <Grid key={_feed.name} item xs={12} sm={6} lg={4}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar src={_feed.avatar} />
                <Box pl={2}>
                  {/* <Typography gutterBottom variant="subtitle2">
                    {_feed.company}
                  </Typography> */}
                  <Typography variant="h4" gutterBottom>
                    {_feed.name}
                  </Typography>
                  {/* <Typography color="text.primary" sx={{ pb: 2 }}>
                    {_feed.jobtitle}
                  </Typography> */}
                  {/* <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddTwoToneIcon />}
                  >
                    Follow
                  </Button> */}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}

export default Feed;
