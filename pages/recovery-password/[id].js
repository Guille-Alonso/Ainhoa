import { useRouter } from 'next/router';
import React from 'react'
import RecoveryPassword from './recovery-password';

const RecoveryPass = () => {
const router = useRouter();
const token = router.query.id;
  return (
    <RecoveryPassword token={token}/>
  )
}

export default RecoveryPass;