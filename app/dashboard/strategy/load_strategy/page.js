'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './StrategyList.module.css';
import Header from '../../header';

const StrategyList = () => {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Function to fetch user strategies
    const fetchUserStrategies = async () => {
      try {
        // GET request to fetch strategies
        // The API will use the userId from cookies
        const response = await fetch('../../Backend/api/strategyload', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          // If user is not authenticated, redirect to login
          if (response.status === 401) {
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch strategies');
        }

        const data = await response.json();
        setStrategies(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching strategies:', err);
        setError('Failed to load strategies. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserStrategies();
  }, [router]);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Function to handle strategy activation/deactivation
  const toggleStrategyStatus = async (strategyId, currentStatus) => {
    try {
      const response = await fetch('../../Backend/api/strategyload', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          strategyId,
          isActive: !currentStatus 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update strategy status');
      }

      const result = await response.json();
      
      if (result.success) {
        // Update local state after successful update
        setStrategies(strategies.map(strategy => 
          strategy._id === strategyId 
            ? { ...strategy, isActive: !strategy.isActive } 
            : strategy
        ));
      } else {
        alert(result.message || 'Failed to update strategy status');
      }
    } catch (err) {
      console.error('Error updating strategy status:', err);
      alert('Failed to update strategy status');
    }
  };

  // Function to delete strategy
  const deleteStrategy = async (strategyId) => {
    if (!window.confirm('Are you sure you want to delete this strategy?')) {
      return;
    }

    try {
      const response = await fetch('../../Backend/api/strategyload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ strategyId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete strategy');
      }

      const result = await response.json();
      
      if (result.success) {
        // Remove strategy from local state
        setStrategies(strategies.filter(strategy => strategy._id !== strategyId));
      } else {
        alert(result.message || 'Failed to delete strategy');
      }
    } catch (err) {
      console.error('Error deleting strategy:', err);
      alert('Failed to delete strategy');
    }
  };

  if (loading) {
    return (<div>
      
      <div className={styles.loading_container}>Loading your strategies...</div>
      </div>);
  }

  if (error) {
    return (<div>
      <div className={styles.error_container}>
        <p>{error}</p>
        <Link href="/login" className={styles.login_link}>Go to Login</Link>
      </div></div>
    );
  }

  if (strategies.length === 0) {
    return (<div>
      <div className={styles.no_strategies_container}>
        
        <h2>No Strategies Found</h2>
        <p>You haven't created any strategies yet.</p>
        <Link href="app\dashboard\strategy\new_strategy" className={styles.create_strategy_btn}>Create New Strategy</Link>
      </div></div>
    );
  }

  return (
    <div className={styles.strategy_list_container}>
      
      <h1>Your Trading Strategies</h1>
      
      <div className={styles.strategy_actions}>
        <Link href=".\new_strategy" className={styles.create_strategy_btn}>Create New Strategy</Link>
      </div>
      
      <div className={styles.strategies_grid}>
        {strategies.map((strategy) => (
          <div key={strategy._id} className={`${styles.strategy_card} ${strategy.isActive ? styles.active : styles.inactive}`}>
            <div className={styles.strategy_header}>
              <h2>{strategy.name}</h2>
              <span className={`${styles.status_badge} ${strategy.isActive ? styles.active : styles.inactive}`}>
                {strategy.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className={styles.strategy_details}>
              <p><strong>Instrument:</strong> {strategy.instrument}</p>
              <p><strong>Created:</strong> {formatDate(strategy.createdAt)}</p>
              
              <div className={styles.entry_conditions}>
                <h3>Entry Conditions</h3>
                <p><strong>Logic:</strong> {strategy.entryConditions.entryLogic || 'Not specified'}</p>
                <p><strong>Value:</strong> {strategy.entryConditions.entryValue || 'Not specified'}</p>
                <p><strong>Time:</strong> {strategy.entryConditions.entryTime || 'Not specified'}</p>
                <p><strong>Position Size:</strong> {strategy.entryConditions.positionSize || 'Not specified'} 
                  {strategy.entryConditions.positionSizeType && ` (${strategy.entryConditions.positionSizeType})`}</p>
              </div>
              
              <div className={styles.exit_conditions}>
                <h3>Exit Conditions</h3>
                <p><strong>Logic:</strong> {strategy.exitConditions.exitLogic || 'Not specified'}</p>
                <p><strong>Value:</strong> {strategy.exitConditions.exitValue || 'Not specified'}</p>
                <p><strong>Time:</strong> {strategy.exitConditions.exitTime || 'Not specified'}</p>
                
                {strategy.exitConditions.useStopLoss && (
                  <p><strong>Stop Loss:</strong> {strategy.exitConditions.stopLossValue} ({strategy.exitConditions.stopLossType})</p>
                )}
                
                {strategy.exitConditions.useTakeProfit && (
                  <p><strong>Take Profit:</strong> {strategy.exitConditions.takeProfitValue} ({strategy.exitConditions.takeProfitType})</p>
                )}
              </div>
            </div>
            
            <div className={styles.strategy_actions}>
              <button 
                className={styles.toggle_status_btn}
                onClick={() => toggleStrategyStatus(strategy._id, strategy.isActive)}
              >
                {strategy.isActive ? 'Deactivate' : 'Activate'}
              </button>
              
              <Link 
                href={{
                  pathname: '/edit-strategy',
                  query: { id: strategy._id },
                }} 
                className={styles.edit_strategy_btn}
              >
                Edit
              </Link>
              
              <button 
                className={styles.delete_strategy_btn}
                onClick={() => deleteStrategy(strategy._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
};

// export default StrategyList;

export default function StrategiesPage() {
  return (
    <>
      <Header />
      <main>
        <StrategyList />
      </main>
    </>
  );
}