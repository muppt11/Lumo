import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { useSession } from '@/session';

interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment' | 'emergency';
  currentBalance: number;
  targetPercentage: number;
  color: string;
}

const SavingsBank: React.FC = () => {
  const { session } = useSession();
  const [totalSavings, setTotalSavings] = useState(0);
  const [piggyBankFill, setPiggyBankFill] = useState(0);
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 'checking',
      name: 'Checking Account',
      type: 'checking',
      currentBalance: 2500,
      targetPercentage: 30,
      color: '#3B82F6'
    },
    {
      id: 'savings',
      name: 'High-Yield Savings',
      type: 'savings',
      currentBalance: 8500,
      targetPercentage: 50,
      color: '#8B5CF6'
    },
    {
      id: 'investment',
      name: 'Investment Portfolio',
      type: 'investment',
      currentBalance: 12000,
      targetPercentage: 15,
      color: '#6366F1'
    },
    {
      id: 'emergency',
      name: 'Emergency Fund',
      type: 'emergency',
      currentBalance: 5000,
      targetPercentage: 5,
      color: '#06B6D4'
    }
  ]);

  // Calculate total savings and piggy bank fill percentage
  useEffect(() => {
    const total = accounts.reduce((sum, account) => sum + account.currentBalance, 0);
    setTotalSavings(total);
    
    // Piggy bank fills based on emergency fund percentage (0-100%)
    const emergencyAccount = accounts.find(acc => acc.type === 'emergency');
    const fillPercentage = emergencyAccount ? Math.min((emergencyAccount.currentBalance / 10000) * 100, 100) : 0;
    setPiggyBankFill(fillPercentage);
  }, [accounts]);

  const handlePercentageChange = (accountId: string, newPercentage: number) => {
    setAccounts(prev => {
      const updatedAccounts = [...prev];
      const targetAccountIndex = updatedAccounts.findIndex(acc => acc.id === accountId);
      
      if (targetAccountIndex === -1) return prev;
      
      // Set the target account's percentage
      updatedAccounts[targetAccountIndex].targetPercentage = newPercentage;
      
      // Calculate the remaining percentage to distribute among other accounts
      const remainingPercentage = 100 - newPercentage;
      const otherAccounts = updatedAccounts.filter((_, index) => index !== targetAccountIndex);
      const otherAccountsTotal = otherAccounts.reduce((sum, acc) => sum + acc.targetPercentage, 0);
      
      // If other accounts have 0 total, distribute equally
      if (otherAccountsTotal === 0) {
        const equalShare = remainingPercentage / otherAccounts.length;
        updatedAccounts.forEach((account, index) => {
          if (index !== targetAccountIndex) {
            account.targetPercentage = Math.round(equalShare * 100) / 100;
          }
        });
      } else {
        // Proportionally adjust other accounts to maintain their relative ratios
        const scaleFactor = remainingPercentage / otherAccountsTotal;
        updatedAccounts.forEach((account, index) => {
          if (index !== targetAccountIndex) {
            account.targetPercentage = Math.round(account.targetPercentage * scaleFactor * 100) / 100;
          }
        });
      }
      
      // Ensure the total is exactly 100% by adjusting the last account if needed
      const total = updatedAccounts.reduce((sum, acc) => sum + acc.targetPercentage, 0);
      if (Math.abs(total - 100) > 0.01) {
        const lastAccountIndex = updatedAccounts.findIndex((_, index) => index !== targetAccountIndex);
        if (lastAccountIndex !== -1) {
          updatedAccounts[lastAccountIndex].targetPercentage = Math.round((100 - (total - updatedAccounts[lastAccountIndex].targetPercentage)) * 100) / 100;
        }
      }
      
      return updatedAccounts;
    });
  };

  const distributeSavings = () => {
    // This would integrate with your banking API to actually move money
    console.log('Distributing savings based on percentages:', accounts);
    // For now, just show a success message
    alert('Savings distributed successfully!');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundBeams />
      
      <div className="container mx-auto px-4 pt-6 pb-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-white tracking-wide mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Savings Bank
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
            Manage your savings across different accounts.
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          {/* Centered Account Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8 w-full"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Account Distribution</h2>
              <h3 className="text-2xl font-bold text-white mb-2">Total Savings</h3>
              <p className="text-4xl font-light text-green-400">${totalSavings.toLocaleString()}</p>
            </div>
            
            {/* Horizontal Slider Row */}
            <div className="grid grid-cols-4 gap-3">
              {accounts.map((account, index) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-blue-900/20 backdrop-blur-lg rounded-2xl p-3 border border-blue-800/30 shadow-lg"
                >
                  <div className="text-center mb-3">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: `${account.color}80` }}
                      ></div>
                      <h3 className="text-sm font-semibold text-white">{account.name}</h3>
                    </div>
                    <span className="text-xs text-white/60">${account.currentBalance.toLocaleString()}</span>
                  </div>

                  {/* Vertical Slider */}
                  <div className="space-y-2">
                    <div className="text-center">
                      <span className="text-lg font-bold text-white">{account.targetPercentage}%</span>
                    </div>
                    
                    <div className="relative flex items-center justify-center h-40">
                      <div className="relative w-6 h-full bg-gray-700/50 rounded-full">
                        <div 
                          className="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-300"
                          style={{ 
                            height: `${account.targetPercentage}%`,
                            backgroundColor: `${account.color}80`
                          }}
                        ></div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={account.targetPercentage}
                          onChange={(e) => handlePercentageChange(account.id, parseInt(e.target.value))}
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          style={{ writingMode: 'bt-lr' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={distributeSavings}
              className="w-full bg-blue-900/20 backdrop-blur-lg border border-blue-800/30 text-white font-medium py-4 px-8 rounded-2xl transition-all duration-300 hover:bg-blue-900/30 hover:border-blue-700/50 shadow-lg"
            >
              Distribute Savings
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SavingsBank;
