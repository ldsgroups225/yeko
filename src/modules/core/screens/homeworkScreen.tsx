import CsCard from '@components/CsCard';
import CsText from '@components/CsText';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@hooks/index';
import useDataFetching from '@hooks/useDataFetching';
import { useHomework } from '@hooks/useHomework';
import { IHomeworkDTO } from '@modules/core/types/IHomeworkDTO';
import { borderRadius, shadows } from '@styles/index';
import { spacing } from '@styles/spacing';
import { ITheme } from '@styles/theme';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AnimatedFlatList, LoadingScreen, SummaryCard } from '../components/index';
import { formatDate, groupBy } from '../utils/index';

const HomeworkScreen: React.FC = () => {
  const themedStyles = useThemedStyles<typeof styles>(styles);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const { getHomeworks } = useHomework();

  const fetchHomework = useCallback(async () => {
    return await getHomeworks('66c1d14b0035eaab4773');
    // Simulate API call delay
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // const mockData: IHomeworkDTO[] = [
    //   {
    //     id: '1',
    //     classId: 'class1',
    //     subjectId: 'subject1',
    //     subjectName: 'Mathématiques',
    //     dueDate: new Date(2024, 3, 15),
    //     itWillBeANote: true,
    //   },
    //   {
    //     id: '2',
    //     classId: 'class1',
    //     subjectId: 'subject2',
    //     subjectName: 'Français',
    //     dueDate: new Date(2024, 3, 16),
    //     itWillBeANote: false,
    //   },
    //   // Add more mock data as needed
    // ];

    // return mockData;
  }, []);

  const {
    data: homeworks,
    loading,
    refreshing,
    fetchData: refetchData,
  } = useDataFetching(fetchHomework, []);

  const summary = useMemo(() => {
    if (!homeworks) return { totalHomework: 0, gradeableHomework: 0 };
    return {
      totalHomework: homeworks.length,
      gradeableHomework: homeworks.filter((hw) => hw.itWillBeANote).length,
    };
  }, [homeworks]);

  const summaryItems = [
    {
      label: 'Total des devoirs',
      value: summary.totalHomework,
      icon: 'book-outline' as const,
      color: themedStyles.primary.color,
    },
    {
      label: 'Devoirs notés',
      value: summary.gradeableHomework,
      icon: 'school-outline' as const,
      color: themedStyles.warning.color,
    },
  ];

  const groupedHomeworks = useMemo(() => {
    if (!homeworks) return [];
    const grouped = groupBy(homeworks, (hw) => formatDate(hw.dueDate, 'yyyy-MM-dd'));
    return Object.entries(grouped).map(([date, items]) => ({
      title: formatDate(new Date(date), 'EEEE d MMMM yyyy'),
      data: items,
    }));
  }, [homeworks]);

  const renderHeader = () => (
    <View style={themedStyles.header}>
      <CsText style={themedStyles.headerTitle}>Devoirs</CsText>
      <View style={themedStyles.monthsContainer}>
        {['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'SEP', 'OCT', 'NOV', 'DEC'].map(
          (month, index) => (
            <TouchableOpacity
              key={month}
              style={[
                themedStyles.monthButton,
                selectedMonth === index && themedStyles.selectedMonthButton,
              ]}
              onPress={() => setSelectedMonth(index)}
            >
              <CsText
                style={[
                  themedStyles.monthButtonText,
                  selectedMonth === index && themedStyles.selectedMonthButtonText,
                ]}
              >
                {month}
              </CsText>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );

  const renderHomeworkItem = useCallback(
    ({ item }: { item: IHomeworkDTO }) => <HomeworkItem homework={item} />,
    []
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={themedStyles.container}>
      {renderHeader()}
      <AnimatedFlatList
        style={themedStyles.homeworkList}
        data={groupedHomeworks}
        renderItem={({ item }) => (
          <>
            <CsText style={themedStyles.dateHeader}>{item.title}</CsText>
            {item.data.map((homework) => (
              <React.Fragment key={homework.id}>
                {renderHomeworkItem({ item: homework })}
              </React.Fragment>
            ))}
          </>
        )}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={
          <SummaryCard
            items={summaryItems}
            primaryColor={themedStyles.primary.color}
            successColor={themedStyles.success.color}
            warningColor={themedStyles.warning.color}
          />
        }
        onRefresh={refetchData}
        refreshing={refreshing}
      />
    </View>
  );
};

const HomeworkItem: React.FC<{ homework: IHomeworkDTO }> = React.memo(({ homework }) => {
  const themedStyles = useThemedStyles<typeof styles>(styles);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: withTiming(0, { duration: 500 }) }],
  }));

  return (
    <Animated.View style={[themedStyles.homeworkItem, animatedStyle]}>
      <CsCard style={themedStyles.homeworkCard}>
        <View style={themedStyles.homeworkHeader}>
          <CsText variant="h3">{homework.subjectName}</CsText>
          {homework.itWillBeANote && (
            <View style={themedStyles.gradeBadge}>
              <CsText variant="caption" style={themedStyles.gradeBadgeText}>
                Noté
              </CsText>
            </View>
          )}
        </View>
        <View style={themedStyles.homeworkDetails}>
          <Ionicons name="calendar-outline" size={16} color={themedStyles.icon.color} />
          <CsText variant="body" style={themedStyles.dueDate}>
            À rendre le {formatDate(homework.dueDate, 'd MMMM')}
          </CsText>
        </View>
      </CsCard>
    </Animated.View>
  );
});

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      backgroundColor: theme.primary,
      padding: spacing.md,
      paddingTop: spacing.xl, // Adjust this value based on your status bar height
    },
    headerTitle: {
      color: theme.background,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
    },
    monthsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: spacing.xs,
    },
    monthButton: {
      alignItems: 'center',
      padding: spacing.xs,
    },
    selectedMonthButton: {
      backgroundColor: theme.primary,
      borderRadius: 8,
    },
    monthButtonText: {
      color: theme.text,
      fontSize: 12,
    },
    selectedMonthButtonText: {
      color: theme.background,
    },
    homeworkList: {
      flex: 1,
      padding: spacing.md,
    },
    dateHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
    },
    homeworkItem: {
      marginBottom: spacing.md,
    },
    homeworkCard: {
      padding: spacing.md,
      ...shadows.small,
    },
    homeworkHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    homeworkDetails: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dueDate: {
      marginLeft: spacing.xs,
      color: theme.textLight,
    },
    gradeBadge: {
      backgroundColor: '#FFA500',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: borderRadius.medium,
    },
    gradeBadgeText: {
      color: theme.background,
      fontWeight: 'bold',
    },
    icon: {
      color: theme.text,
    },
    primary: {
      color: theme.primary,
    },
    success: { color: '#4CAF50' },
    warning: { color: '#FFA500' },
  });

export default HomeworkScreen;
