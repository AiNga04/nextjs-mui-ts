'use client'
import { useSearchParams } from "next/navigation";
import WaveTrack from "@/components/track/wave.track";
import Box from "@mui/material/Box";
import { Container, Typography, IconButton, Button } from "@mui/material";
import Img from '@/assets/images/carousel-1.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RepeatIcon from '@mui/icons-material/Repeat';

const DetailTrackPage = (props: any) => {
    const { params } = props;
    const searchParams = useSearchParams();
    const audio = searchParams.get('audio');

    return (
        <Container sx={{ padding: '20px !important' }}>
            {/* Wave + Ảnh */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                backgroundImage: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
                borderRadius: '8px',
                padding: '20px',
                gap: '20px',
            }}>
                <Box sx={{ width: { xs: '100%', md: '70%' } }}>
                    <Typography variant="h6" mb={1}>Slug: {params.slug}</Typography>
                    <Typography variant="body2" mb={2}>Audio: {audio}</Typography>
                    <WaveTrack />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '30%' } }}>
                    <img src={Img.src} alt="track-img" style={{ width: '100%', borderRadius: '10px' }} />
                </Box>
            </Box>

            {/* Tương tác + Thống kê */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 3,
                flexWrap: 'wrap',
                gap: 2,
            }}>
                <Box>
                    <Typography variant="subtitle1" fontWeight={600}>Tương tác</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <IconButton><FavoriteBorderIcon /></IconButton>
                        <IconButton><RepeatIcon /></IconButton>
                        <IconButton><ShareIcon /></IconButton>
                        <IconButton><ContentCopyIcon /></IconButton>
                    </Box>
                </Box>

                <Box>
                    <Typography variant="subtitle1" fontWeight={600}>Thống kê</Typography>
                    <Typography variant="body2">❤️ 1.2k lượt thích</Typography>
                    <Typography variant="body2">🎧 5.3k lượt nghe</Typography>
                </Box>
            </Box>

            {/* Mô tả bài hát */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>Mô tả bài hát</Typography>
                <Typography variant="body1">
                    Đây là bài hát nổi bật trong tuần qua với lượt nghe cao và nhiều lượt chia sẻ trên nền tảng...
                </Typography>
            </Box>

            {/* Bình luận + Gợi ý */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                mt: 5,
                gap: 3,
            }}>
                {/* Bình luận & Trending */}
                <Box sx={{ flex: 2, paddingBottom: '70px' }}>
                    <Typography variant="h6" gutterBottom>Bình luận</Typography>
                    <Box sx={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        minHeight: '150px',
                        background: '#fff'
                    }}>
                        <Typography variant="body2" mb={1}>Thêm bình luận...</Typography>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                            Hiển thị các bình luận ở đây.
                        </div>
                    </Box>

                    <Typography variant="h6" mt={4} gutterBottom>Trending Pop Songs</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        <Typography variant="body2">🎵 Song A - Artist A</Typography>
                        <Typography variant="body2">🎵 Song B - Artist B</Typography>
                        <Typography variant="body2">🎵 Song C - Artist C</Typography>
                    </Box>
                </Box>

                {/* Nghe nhiều */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>Nghe nhiều</Typography>

                    {/* Bộ lọc thời gian */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        {['Ngày', 'Tuần', 'Tháng'].map(label => (
                            <Button
                                key={label}
                                variant="outlined"
                                size="small"
                                sx={{ borderRadius: '20px', textTransform: 'none' }}
                            >
                                {label}
                            </Button>
                        ))}
                    </Box>

                    {/* Danh sách bài hát */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {[1, 2, 3].map(i => (
                            <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Box sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: '8px',
                                    backgroundImage: `url(${Img.src})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }} />
                                <Box>
                                    <Typography variant="body2" fontWeight={500}>Bài hát {i}</Typography>
                                    <Typography variant="caption" color="text.secondary">Ca sĩ {i}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default DetailTrackPage;
