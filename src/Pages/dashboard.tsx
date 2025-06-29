import { useParams } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const Dashboard = () => {
    const { slug } = useParams<{ slug: string }>();
    const { User } = useAuthStore();
    return (
        <div>dashboard</div>
    )
}

export default Dashboard