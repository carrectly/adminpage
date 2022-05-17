import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';
import { me } from '../store';
import { isNil } from 'lodash';

const AllCustomers = React.lazy(() => import('../components/CustomersView/AllCustomers'));
const SingleCustomer = React.lazy(() =>
  import('../components/SingleCustomerView/SingleCustomer.js'),
);
const AllOrders = React.lazy(() => import('../components/ArchivedOrdersView/AllOrders'));
const SingleOrder = React.lazy(() => import('../components/SingleOrderView/SingleOrder'));
const Account = React.lazy(() => import('../components/Account'));
const AuthPage = React.lazy(() => import('../components/AuthPage'));
const Dealers = React.lazy(() => import('../components/DealersView/Dealers'));
const CalendarView = React.lazy(() => import('../components/Calendar'));
const AllServices = React.lazy(() => import('../components/ServicesTableView/AllServices'));
const Drivers = React.lazy(() => import('../components/DriversView/Drivers'));
const Users = React.lazy(() => import('../components/UsersView/Users'));
const AllTripsView = React.lazy(() => import('../components/AllTripsView/AllTripsView'));

const ProtectedRoute = ({ isAuthorized, children }) => {
  if (!isNil(isAuthorized) && isAuthorized === false) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppRoutes() {
  const userRole = useSelector((state) => state.user.role);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  if (isLoading === true && !isAuthorized) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <>
            {isAuthorized === null && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            )}
            {isAuthorized === true && <Navigate to={'/account'} />}
            {isAuthorized === false && <Navigate to={'/login'} />}
          </>
        }
      />
      <Route
        path="/login"
        element={
          <React.Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            }
          >
            <AuthPage />
          </React.Suspense>
        }
      />
      <Route
        path="/account"
        element={
          <React.Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            }
          >
            <ProtectedRoute isAuthorized={isAuthorized}>
              <Account />
            </ProtectedRoute>
          </React.Suspense>
        }
      />

      <Route
        path="/allOrders"
        element={
          <React.Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            }
          >
            <ProtectedRoute isAuthorized={isAuthorized}>
              <AllOrders />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      <Route
        path="/allServices"
        element={
          <React.Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            }
          >
            <ProtectedRoute isAuthorized={isAuthorized}>
              <AllServices />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      <Route
        path="/allCustomers"
        element={
          <React.Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            }
          >
            <ProtectedRoute isAuthorized={isAuthorized}>
              <AllCustomers />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      {userRole === 'driver' && (
        <Route
          path="/alltrips"
          element={
            <React.Suspense
              fallback={
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Spin />
                </div>
              }
            >
              <ProtectedRoute isAuthorized={isAuthorized}>
                <AllTripsView />
              </ProtectedRoute>
            </React.Suspense>
          }
        />
      )}
      <Route
        path="/singlecustomer/:userid"
        element={
          <React.Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            }
          >
            <ProtectedRoute isAuthorized={isAuthorized}>
              <SingleCustomer />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      <Route
        path="/singleorder/:orderid"
        element={
          <React.Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            }
          >
            <ProtectedRoute isAuthorized={isAuthorized}>
              <SingleOrder />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      <Route
        path="/dealers"
        element={
          <React.Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            }
          >
            <ProtectedRoute isAuthorized={isAuthorized}>
              <Dealers />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      <Route
        path="/users"
        element={
          <React.Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            }
          >
            <ProtectedRoute isAuthorized={isAuthorized}>
              <Users />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      <Route
        path="/drivers"
        element={
          <React.Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            }
          >
            <ProtectedRoute isAuthorized={isAuthorized}>
              <Drivers />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      <Route
        path="/calendar"
        element={
          <React.Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            }
          >
            <ProtectedRoute isAuthorized={isAuthorized}>
              <CalendarView />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
