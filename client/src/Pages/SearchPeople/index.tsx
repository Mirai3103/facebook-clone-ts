import React from 'react';
import HomeLayout from '../../Layouts/HomeLayout';
import { useLocation } from 'react-router-dom'
import UserService, { IUserSearch } from '../../Services/UserService';
import SearchResult from './SearchResult';

export default function SearchPeople() {
    const { search } = useLocation();
    const query = React.useMemo(() => new URLSearchParams(search)
        , [search]);
    const [users, setUsers] = React.useState<IUserSearch[]>([]);
    console.log(users);

    React.useEffect(() => {
        const name = query.get('name');
        if (name) {
            UserService.getUserHasNameLike(name).then(res => {
                setUsers(res.data.users);
                console.log(res.data.users);
            }
            ).catch(err => {
                console.log(err);
            }
            );
        }
    }, [query]);

    return (
        <HomeLayout>
            <div className='flex w-full justify-center mt-16 '>
                <div className='flex w-[500px] flex-col'>
                    {users?.map(user => {
                        return <SearchResult user={user} key={user.id} />
                    })}
                </div>
            </div>
        </HomeLayout>
    );
}
